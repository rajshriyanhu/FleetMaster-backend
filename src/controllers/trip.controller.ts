import { NextFunction, Request, Response } from "express";
import prismaClient from "../db/db.config";

export const createtrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [newTrip] = await prismaClient.$transaction([
    prismaClient.trip.create({
      data: req.body,
    }),
    prismaClient.vehicle.update({
      where: { id: req.body.vehicle_id },
      data: {
        km_run: {
          increment: req.body.total_km,
        },
      },
    }),
  ]);
  res.status(201).json({ success: true, trip: newTrip });
};

export const getAllTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const searchQuery = (req.query.search as string) || "";
  const sortBy = (req.query.sortBy as string) || "profit";

  const [trips, total] = await Promise.all([
    prismaClient.trip.findMany({
      where: {
        deleted: false,
        OR: [
          { start_location: { contains: searchQuery, mode: "insensitive" } },
          { end_location: { contains: searchQuery, mode: "insensitive" } },
          { driver : {
            name: { contains: searchQuery, mode: "insensitive" }
          }}
        ],
      },
      include :{
        driver: true,
        customer: true,
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: "asc",
      },
    }),
    prismaClient.trip.count({
      where: {
        deleted: false,
        OR: [
          { start_location: { contains: searchQuery, mode: "insensitive" } },
          { end_location: { contains: searchQuery, mode: "insensitive" } },
          { driver : {
            name: { contains: searchQuery, mode: "insensitive" }
          }}
        ],
      },
    }),
  ]);

  res.status(200).json({
    success: true,
    data: trips,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  });
};

export const getTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tripId = req.params.id;
  const trip = await prismaClient.trip.findFirst({
    where: { id: tripId },
    include: {
      vehicle : true,
      driver : true,
      customer: true,
    }
  });

  if (!trip) {
    return res
      .status(404)
      .json({ success: false, message: "Trip not found" });
  }
  if (trip.deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Trip has been deleted" });
  }
  res.status(200).json({ success: true, trip: trip });
};

export const updateTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tripId = req.params.id;
  const trip = await prismaClient.trip.findFirst({
    where: { id: tripId },
  });

  if (!trip) {
    return res
      .status(404)
      .json({ success: false, message: "Trip not found" });
  }
  if (trip.deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Trip has been deleted" });
  }
  const updatedTrip = await prismaClient.trip.update({
    where: { id: tripId },
    data: req.body,
  });

  res.status(200).json({ success: true, trip: updatedTrip });
};

export const deleteTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tripId = req.params.id;
  const trip = await prismaClient.trip.findFirst({
    where: { id: tripId },
  });

  if (!trip) {
    return res
      .status(404)
      .json({ success: false, message: "Trip not found" });
  }
  if (trip.deleted) {
    return res
      .status(200)
      .json({ success: false, message: "Trip has been already deleted" });
  }
  await prismaClient.trip.update({
    where: { id: tripId },
    data: { deleted: true },
  });
  res.status(200).json({ success: true, trip: trip });
};

