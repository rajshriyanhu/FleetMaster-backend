import { NextFunction, Request, Response } from "express";
import prismaClient from "../db/db.config";
import * as jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root.exception";
import { NotFoundException } from "../exceptions/not-found";
import { UnauthorizedException } from "../exceptions/unauthorized";

export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, password } = req.body;
    let existingUser = await prismaClient.user.findFirst({ where: { email: email } });
    if (existingUser) {
        return res.status(409).json({message: 'User already exists'})
    }
    const user = await prismaClient.user.create({
        data: {
            email,
            name,
            password,
            role: 'USER',
            permissions: {
                vehicle: {
                    read: false,
                    write: false
                },
                trip: {
                    read: false,
                    write: false
                }
            }
        }
    })
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
    res.json({ id: user.id,
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
        return next(
            new NotFoundException("User not found", ErrorCode.NOT_FOUND)
        );
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
    res.json({ id: user.id,
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

    if(!user) {
        return next(new NotFoundException("User not found", ErrorCode.NOT_FOUND));
    }
    if(user.role !== 'ADMIN'){
        return next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }

    const updatedUser = await prismaClient.user.update({
        where: {
            id: req.body.userId,
        },
        data: {
            permissions: req.body.permissions
        }
    })
    console.log(updatedUser)
    res.status(200).json({message: "User's permission updated!" })
}


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
            role: 'USER'
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
    })
    res.json(users);
}