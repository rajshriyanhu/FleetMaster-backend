import { NextFunction, Request, Response } from "express";
import prismaClient from "../db/db.config";

export const createVehicleEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newVehicle = await prismaClient.vehicle.create({
    data: req.body,
  });
  res.status(201).json({ success: true, vehicle: newVehicle });
};

export const getAllVehicles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const searchQuery = (req.query.search as string) || "";

  const [vehicles, total] = await Promise.all([
    prismaClient.vehicle.findMany({
      where: {
        deleted: false,
        OR: [
          { registration_no: { contains: searchQuery } },
        ],
      },
      skip,
      take: limit,
    }),
    prismaClient.vehicle.count({
      where: {
        deleted: false,
        OR: [
          { registration_no: { contains: searchQuery } },
        ],
      },
    }),
  ]);

  res.status(200).json({
    success: true,
    data: vehicles,
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

export const getVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vehicleId = req.params.id;
  const vehicle = await prismaClient.vehicle.findFirst({
    where: { id: vehicleId,},
  });

  if (!vehicle) {
    return res
      .status(404)
      .json({ success: false, message: "Vehicle not found" });
  }
  if(vehicle.deleted){
    return res
     .status(404)
     .json({ success: false, message: "Vehicle has been deleted" });
  }
  res.status(200).json({ success: true, vehicle: vehicle });
};


export const updateVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vehicleId = req.params.id;
  const vehicle = await prismaClient.vehicle.findFirst({
    where: { id: vehicleId },
  });

  if (!vehicle) {
    return res
      .status(404)
      .json({ success: false, message: "Vehicle not found" });
  }
  if(vehicle.deleted){
    return res
     .status(404)
     .json({ success: false, message: "Vehicle has been deleted" });
  }
  const updatedVehicle = await prismaClient.vehicle.update({
    where: { id: vehicleId },
    data: req.body,
  });

  res.status(200).json({ success: true, vehicle: updatedVehicle });
};


export const deleteVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vehicleId = req.params.id;
  const vehicle = await prismaClient.vehicle.findFirst({
    where: { id: vehicleId },
  });

  if (!vehicle) {
    return res
      .status(404)
      .json({ success: false, message: "Vehicle not found" });
  }
  if(vehicle.deleted){
    return res
     .status(200)
     .json({ success: false, message: "Vehicle has been already deleted" });
  }
  await prismaClient.vehicle.update({
    where: { id: vehicleId },
    data: { deleted: true },
  })
  res.status(200).json({ success: true, vehicle: vehicle });
};