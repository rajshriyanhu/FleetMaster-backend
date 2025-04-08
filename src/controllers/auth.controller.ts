import { NextFunction, Request, Response } from "express";
import prismaClient from "../db/db.config";
import * as jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root.exception";
import { NotFoundException } from "../exceptions/not-found";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { read, write } from "fs";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, code, inviteId } = req.body;

  let existingUser = await prismaClient.user.findFirst({
    where: { email: email },
  });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  const invite = await prismaClient.invite.findFirst({
    where: {
      id: inviteId,
    },
  });

  if(!invite){
    return res.status(409).json({ message: "Invalid invite" });
  }

  if (invite.code !== code) {
    return res.status(409).json({ message: "Invalid invite code" });
  }

  const permissions = getPermissions(invite.role);

  const user = await prismaClient.user.create({
    data: {
      email,
      name,
      password,
      role: invite.role,
      permissions: permissions,
    },
  });
  const accessToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email: email } });
  if (!user) {
    return next(new NotFoundException("User not found", ErrorCode.NOT_FOUND));
  }
  if (password !== user.password) {
    return next(
      new BadRequestException(
        "Invalid credentials",
        ErrorCode.WRONG_CREDENTIALS
      )
    );
  }
  const accessToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });
  res.status(200).json({ message: "Logout successful" });
};

export const updateAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const user = await prismaClient.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return next(new NotFoundException("User not found", ErrorCode.NOT_FOUND));
  }
  if (user.role !== "ADMIN") {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
    );
  }

  const updatedUser = await prismaClient.user.update({
    where: {
      id: req.body.userId,
    },
    data: {
      role: req.body.role,
      permissions: getPermissions(req.body.role),
    },
  });
  console.log(updatedUser);
  res.status(200).json({ message: "User's permission updated!" });
};

export const getLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const user = await prismaClient.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      permissions: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.json(user);
};

export const allUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await prismaClient.user.findMany({
    where: {
      role: {
        in: ["VIEWER", "EDITOR"],
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      permissions: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.json(users);
};



const getPermissions = (role : "ADMIN" | "EDITOR" | "VIEWER")  => {
  let permission = {
    vehicle: {
        read: true,
        write: true,
        update: false,
        delete: false,
    },
    trip : {
        read: true,
        write: true,
        update: false,
        delete: false,
    },
    driver: {
        read: true,
        write: true,
        update: false,
        delete: false,
    },
    constomer: {
        read: true,
        write: true,
        update: false,
        delete: false,
    },
    expense: {
      read: true,
      write: true,
      update: false,
      delete: false,
  },
    user : {
        read: false,
        write: false,
        update: false,
        delete: false,
    }
}

  if(role === "ADMIN"){
    permission = {
        vehicle: {
            read: true,
            write: true,
            update: true,
            delete: true,
        },
        trip : {
            read: true,
            write: true,
            update: true,
            delete: true,
        },
        driver: {
            read: true,
            write: true,
            update: true,
            delete: true,
        },
        constomer: {
            read: true,
            write: true,
            update: true,
            delete: true,
        },
        expense: {
          read: true,
          write: true,
          update: true,
          delete: true,
      },
        user : {
            read: true,
            write: true,
            update: true,
            delete: true,
        }
    }
  }

  if(role === "EDITOR"){
    permission = {
        vehicle: {
            read: true,
            write: true,
            update: true,
            delete: false,
        },
        trip : {
            read: true,
            write: true,
            update: true,
            delete: false,
        },
        driver: {
            read: true,
            write: true,
            update: true,
            delete: false,
        },
        constomer: {
            read: true,
            write: true,
            update: true,
            delete: false,
        },
        expense: {
          read: true,
          write: true,
          update: true,
          delete: false,
      },
        user : {
            read: false,
            write: false,
            update: true,
            delete: false,
        }
    }
  }

  return permission;
    
}