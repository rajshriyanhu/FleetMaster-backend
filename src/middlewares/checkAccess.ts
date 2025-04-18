import { NextFunction, Request, Response } from "express";
import prismaClient from "../db/db.config";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root.exception";

type Resource = 'vehicle' | 'trip' | 'driver' | 'customer' | 'user' | 'expense';
type Action = 'read' | 'write' | 'update' | 'delete';

type Permission = {
    [keyof: string]: {
      read: boolean;
      write: boolean;
      update: boolean;
      delete: boolean;
    };
  };

export const checkAccess = (packageName: Resource, action: Action) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let user = await prismaClient.user.findFirst({ where: { id: req.userId } });
        if (!user) {
            return next(
                new NotFoundException("User not found", ErrorCode.NOT_FOUND)
            );
        }
        if(user.role === 'ADMIN'){
            return next();
        }
        const permissions: Permission = user.permissions as unknown as Permission;

        if (!permissions || !permissions[packageName]?.[action]) {
        return res.status(409).json({ message: "Access denied" });
      }
        next();
        } catch (error) {
            console.error("Error in checkAccess middleware:", error);
      return res.status(500).json({ message: "Internal server error" });
        }
    };
};