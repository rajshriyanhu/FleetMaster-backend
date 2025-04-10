import { NextFunction, Request, Response } from "express";
import prismaClient from "../db/db.config";

export const createDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    email,
    phone_number,
    alt_phone_number,
    emg_name,
    emg_relation,
    emg_phone_number,
    insurance_valid_upto,
    employment_status,
    joining_date,
    exit_date,
    working_region,
    working_state,
    working_city,
    dl_number,
    experience,
    expertise,
    document_url,
    street,
    city,
    state,
    postal_code,
  } = req.body;
  const address = await prismaClient.address.create({
    data: {
      street,
      city,
      state,
      postal_code,
    },
  });
  const newDriver = await prismaClient.driver.create({
    data: {
      name,
      email,
      phone_number,
      alt_phone_number,
      emg_name,
      emg_relation,
      emg_phone_number,
      insurance_valid_upto,
      employment_status,
      joining_date,
      exit_date,
      working_region,
      working_state,
      working_city,
      document_url,
      dl_number,
      experience,
      expertise,
      address_id: address.id,
      tenant_id: req.tenantId,
    },
  });
  res.status(201).json({ success: true, driver: newDriver });
};

export const getAllDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const searchQuery = (req.query.search as string) || "";
  const sortBy = (req.query.sortBy as string) || "name";

  const [drivers, total] = await Promise.all([
    prismaClient.driver.findMany({
      where: {
        tenant_id: req.tenantId,
        deleted: false,
        OR: [
          { name: { contains: searchQuery } },
          { email: { contains: searchQuery} },
          { phone_number: { contains: searchQuery } },
        ],
      },
      include: {
        address: true,
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: "asc",
      },
    }),
    prismaClient.driver.count({
      where: {
        deleted: false,
        OR: [
          { name: { contains: searchQuery } },
          { email: { contains: searchQuery } },
          { phone_number: { contains: searchQuery} },
        ],
      },
    }),
  ]);

  res.status(200).json({
    success: true,
    data: drivers,
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

export const getDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const driverId = req.params.id;
  const driver = await prismaClient.driver.findFirst({
    where: { id: driverId },
    include: {
      address: true,
    },
  });

  if (!driver) {
    return res
      .status(404)
      .json({ success: false, message: "Driver not found" });
  }
  if (driver.deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Driver has been deleted" });
  }
  res.status(200).json({ success: true, driver: driver });
};

export const updateDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const driverId = req.params.id;
  const {
    name,
    email,
    phone_number,
    dl_number,
    experience,
    expertise,
    street,
    city,
    state,
    country,
    postal_code,
  } = req.body;
  const driver = await prismaClient.driver.findFirst({
    where: { id: driverId },
    include: {
      address: true,
    },
  });
  if (!driver) {
    return res
      .status(404)
      .json({ success: false, message: "Driver not found" });
  }
  if (driver.deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Driver has been deleted" });
  }
  await prismaClient.address.update({
    where: {
      id: driver.address_id!,
    },
    data: {
      street,
      city,
      state,
      postal_code,
    },
  });
  const updatedDriver = await prismaClient.driver.update({
    where: { id: driverId },
    data: {
      name,
      email,
      phone_number,
      dl_number,
      experience,
      expertise,
    },
  });
  res.status(200).json({ success: true, customer: updatedDriver });
};

export const deleteDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const driverId = req.params.id;
  const driver = await prismaClient.driver.findFirst({
    where: { id: driverId },
  });
  if (!driver) {
    return res
      .status(404)
      .json({ success: false, message: "Driver not found" });
  }
  if (driver.deleted) {
    return res
      .status(200)
      .json({ success: false, message: "Driver has been already deleted" });
  }
  await prismaClient.driver.update({
    where: { id: driverId },
    data: { deleted: true },
  });
  res.status(200).json({ success: true, driver: driver });
};

