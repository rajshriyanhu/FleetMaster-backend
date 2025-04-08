import 'reflect-metadata';
import dotenv from 'dotenv';
import { app } from './app';
import { addCustomerAndDriver, addInitialVehicles, addTrips, initializeAdminUser } from './utils/fill-db';

dotenv.config({})

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


// addInitialVehicles();
// addCustomerAndDriver();
// addTrips();
startServer();
