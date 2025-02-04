import 'reflect-metadata';
import dotenv from 'dotenv';
import { app } from './app';
import prismaClient from './db/db.config';

dotenv.config({
    path: './env'
})

async function initializeAdminUser() {
    try {
      const adminEmail = "admin@gmail.com"; 
      const adminPassword = "password";
  
      const existingAdmin = await prismaClient.user.findFirst({
        where: { role: "ADMIN" },
      });
  
      if (!existingAdmin) {
        console.log("No admin user found. Creating default admin...");
  
        await prismaClient.user.create({
          data: {
            name: "admin",
            email: adminEmail,
            password: adminPassword,
            role: "ADMIN", // Admin role
            permissions: {
              vehicle: { read: true, write: true },
              trip: { read: true, write: true },
              customer: { read: true, write: true },
              driver: { read: true, write: true },
            }, 
          },
        });
  
        console.log(`Admin user created with email: ${adminEmail}`);
      } else {
        console.log("Admin user already exists. Skipping initialization.");
      }
    } catch (error) {
      console.error("Error during admin initialization:", error);
    }
  }

const startServer = async () => {
    try {
        await initializeAdminUser();
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 8000}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1); 
    }
};

startServer();
