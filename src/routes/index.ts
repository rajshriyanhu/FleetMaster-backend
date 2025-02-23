import { Router } from "express";
import { BASE_AUTH_PATH, BASE_CUSTOMER_PATH, BASE_DASHBOARD_PATH, BASE_DRIVER_PATH, BASE_EXPENSE_PATH, BASE_FILE_PATH, BASE_FORM_PATH, BASE_TRIP_PATH, BASE_VEHICLE_PATH } from "../constants";
import vehicleRoutes from '../routes/vehicle.route'
import tripRoutes from "./trip.route";
import expenseRoutes from "./expense.route";
import customerRoutes from "./customer.route";
import driverRoutes from "./driver.route";
import fileRoutes from "./file.route";
import authRoutes from "./auth.route";
import formRoutes from "./form.route";
import dashboardRoutes from "./dashboard.route";

const rootRouter : Router = Router();

rootRouter.use(BASE_AUTH_PATH, authRoutes)
rootRouter.use(BASE_VEHICLE_PATH, vehicleRoutes)
rootRouter.use(BASE_TRIP_PATH, tripRoutes)
rootRouter.use(BASE_EXPENSE_PATH, expenseRoutes)
rootRouter.use(BASE_CUSTOMER_PATH, customerRoutes)
rootRouter.use(BASE_DRIVER_PATH, driverRoutes)
rootRouter.use(BASE_FILE_PATH, fileRoutes)
rootRouter.use(BASE_FORM_PATH, formRoutes)
rootRouter.use(BASE_DASHBOARD_PATH, dashboardRoutes)


export default rootRouter;