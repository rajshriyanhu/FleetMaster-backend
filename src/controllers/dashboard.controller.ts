import { NextFunction, Request, Response } from "express";
import prismaClient from "../db/db.config";
import { addMonths, subMonths } from "date-fns";

export const getDashboardTrips = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const today = new Date();
    const oneMonthBack = subMonths(today, 1);
    const oneMonthForward = addMonths(today, 1);

    const trips = await prismaClient.trip.findMany({
      where: {
        start_date: {
          gte: oneMonthBack,
          lte: oneMonthForward,
        },
      },
      include: {
        vehicle: false,
        driver: false,
      },
    });

    res.status(200).json({ success: true, trips });
  };

  export const getDashboardTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const today = new Date();
    const oneMonthFromNow = addMonths(today, 1);
  
    const vehicles = await prismaClient.vehicle.findMany({
      where: {
        deleted: false,
        OR: [
          { insurance_validity: { gte: today, lte: oneMonthFromNow } },
          { puc_validity: { gte: today, lte: oneMonthFromNow } },
          { fitness_validity: { gte: today, lte: oneMonthFromNow } },
          { last_battery_change: { gte: today, lte: oneMonthFromNow } },
          { next_service_due: { gte: today, lte: oneMonthFromNow } },
          { gps_renewal_due: { gte: today, lte: oneMonthFromNow } },
        ],
      },
    });
  
    // 🔹 Transforming the response to include `dueTasks`
    const transformedVehicles = vehicles.map(vehicle => {
      let dueTasks: string[] = [];
  
      if (vehicle.insurance_validity >= today && vehicle.insurance_validity <= oneMonthFromNow) {
        dueTasks.push("insurance_validity");
      }
      if (vehicle.puc_validity >= today && vehicle.puc_validity <= oneMonthFromNow) {
        dueTasks.push("puc_validity");
      }
      if (vehicle.fitness_validity >= today && vehicle.fitness_validity <= oneMonthFromNow) {
        dueTasks.push("fitness_validity");
      }
      if (vehicle.last_battery_change && vehicle.last_battery_change >= today && vehicle.last_battery_change <= oneMonthFromNow) {
        dueTasks.push("last_battery_change");
      }
      if (vehicle.next_service_due >= today && vehicle.next_service_due <= oneMonthFromNow) {
        dueTasks.push("next_service_due");
      }
      if (vehicle.gps_renewal_due >= today && vehicle.gps_renewal_due <= oneMonthFromNow) {
        dueTasks.push("gps_renewal_due");
      }
  
      return { ...vehicle, dueTasks }; // 🔹 Add `dueTasks` array
    });
  
    res.status(200).json({ success: true, vehicles: transformedVehicles });
  };
  