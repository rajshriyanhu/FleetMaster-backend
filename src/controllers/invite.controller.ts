import { NextFunction, Request, Response } from "express";
import prismaClient from "../db/db.config";
import { Resend } from "resend";
import { sendEmail } from "../utils/mailer";

const resend = new Resend(`${process.env.RESEND_API_KEY}`);

export const inviteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, role } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  const invite = await prismaClient.invite.create({
    data: {
      name,
      email,
      role,
      code: otp,
    },
  });

  try {
    await sendEmail(email, "Welcome to Fleet Master - Your Invitation", `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to Fleet Master!</h2>
            <p>Hello ${name},</p>
            <p>You have been invited to join Fleet Master as a ${role}.</p>
            <p>Your registration code is: <strong>${otp}</strong></p>
            <p>Please use this code during the registration process.</p>
            <p>Click the link below to complete your registration:</p>
            <a href="http://localhost:3000/sign-up?inviteId=${invite.id}&email=${email}&name=${name}" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 15px 0;">Register Now</a>
            <p>This invitation link will expire in 24 hours.</p>
            <p>If you have any questions, please contact your administrator.</p>
            <p>Best regards,<br>The Fleet Master Team</p>
          </div>`);

    res.status(201).json({ message: "Invite sent successfully" });
  } catch (error: any) {
    // Delete the created invite if email sending fails
    await prismaClient.invite.delete({
      where: { id: invite.id }
    });
    
    res.status(500).json({ 
      message: "Failed to send invitation email",
      error: error.message 
    });
  }
};

export const cancelInvite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(201).json({});
};

export const resendInvite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(201).json({});
};

export const getAllInvites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await prismaClient.invite.deleteMany({
    where: {
      created_at: {
        lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    }
  })
  const invites = await prismaClient.invite.findMany({});
  res.status(201).json({invites});
};