import { Router} from 'express'
import { errorHandler } from '../utils/errorHandler'
import { authMiddleware } from '../middlewares/auth';
import { getDashboardTasks, getDashboardTrips } from '../controllers/dashboard.controller';

const dashboardRoutes:Router = Router()

dashboardRoutes.get('/trips',authMiddleware, errorHandler(getDashboardTrips));
dashboardRoutes.get('/tasks',authMiddleware, errorHandler(getDashboardTasks));


export default dashboardRoutes