import { NextFunction, Request, Response } from "express";
import prismaClient from "../db/db.config";
import * as jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root.exception";
import { NotFoundException } from "../exceptions/not-found";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { sendEmail } from "../utils/mailer";
import * as bcrypt from "bcrypt";

export const adminSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, secret } = req.body;

  let existingUser = await prismaClient.user.findFirst({
    where: { email: email },
  });

  if (secret !== process.env.ADMIN_USER_SECRET) {
    return res.status(409).json({ message: "Invalid secret" });
  }

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tenant = await prismaClient.tenant.create({
    data: {
      admin_name: name,
      admin_email: email,
    },
  });

  const permissions = getPermissions("ADMIN");

  const user = await prismaClient.user.create({
    data: {
      email,
      name,
      password : hashedPassword,
      role: "ADMIN",
      permissions: permissions,
      tenant_id: tenant.id,
    },
  });

  const accessToken = jwt.sign(
    {
      userId: user.id,
      tenantId: tenant.id,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "7d" }
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
    tenantId: user.tenant_id,
    permissions: user.permissions,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};

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

  if (!invite) {
    return res.status(409).json({ message: "Invalid invite" });
  }

  if (invite.code !== code) {
    return res.status(409).json({ message: "Invalid invite code" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const permissions = getPermissions(invite.role);

  const user = await prismaClient.user.create({
    data: {
      email,
      name,
      password : hashedPassword,
      role: invite.role,
      permissions: permissions,
      tenant_id: invite.tenant_id,
    },
  });
  const accessToken = jwt.sign(
    {
      userId: user.id,
      tenantId: invite.tenant_id,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "7d" }
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

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
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
      tenantId: user.tenant_id,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "7d" }
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
    tenantId: user.tenant_id,
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

  await prismaClient.user.update({
    where: {
      id: req.body.userId,
    },
    data: {
      role: req.body.role,
      permissions: getPermissions(req.body.role),
    },
  });
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
  const tenantId = req.tenantId;
  const users = await prismaClient.user.findMany({
    where: {
      // tenant_id: tenantId,
      // role: {
      //   in: ["VIEWER", "EDITOR"],
      // },
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      permissions: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.json(users);
};

export const getAlltenants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tenants = await prismaClient.tenant.findMany({});
  res.json(tenants);
};


export const updatePassword = async (
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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const updatedUser = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });
  res.status(200).json({ message: "Password updated!" });
};

export const sendCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) {
    return next(new NotFoundException("User not found", ErrorCode.NOT_FOUND));
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  await sendEmail(
    email,
    "Reset your password - Fleet Master",
    `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Welcome to Fleet Master!</h2>
    <p>Your verification code is: <strong>${otp}</strong></p>
    <p>Please use this code during the password reset process.</p>
    <p>Best regards,<br>The Fleet Master Team</p>
  </div>`
  );

  res.status(201).json({ message: "Invite sent successfully" });
};

const getPermissions = (role: "ADMIN" | "EDITOR" | "VIEWER") => {
  let permission = {
    vehicle: {
      read: true,
      write: true,
      update: false,
      delete: false,
    },
    trip: {
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
    user: {
      read: false,
      write: false,
      update: false,
      delete: false,
    },
  };

  if (role === "ADMIN") {
    permission = {
      vehicle: {
        read: true,
        write: true,
        update: true,
        delete: true,
      },
      trip: {
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
      user: {
        read: true,
        write: true,
        update: true,
        delete: true,
      },
    };
  }

  if (role === "EDITOR") {
    permission = {
      vehicle: {
        read: true,
        write: true,
        update: true,
        delete: false,
      },
      trip: {
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
      user: {
        read: false,
        write: false,
        update: true,
        delete: false,
      },
    };
  }

  return permission;
};
