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
  const vehicles = await prismaClient.vehicle.findMany({
    where: {
      deleted: false
    }
  });
  res.status(200).json({ success: true, vehicles: vehicles });
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