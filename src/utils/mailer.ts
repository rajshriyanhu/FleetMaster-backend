import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // e.g., smtp.gmail.com
  port: 587,                // or 465 for SSL
  secure: false,            // true for 465, false for other ports
  auth: {
    user: 'abhitestertester@gmail.com',
    pass: 'twcfgzzgtpvbszoo',
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: '"Fleet Master" <fleetmaster@gmail.com>',
      to,
      subject,
      html,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};