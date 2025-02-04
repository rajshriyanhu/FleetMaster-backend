import { Router} from 'express'
import { errorHandler } from '../utils/errorHandler'
import { createtrip, deleteTrip, getAllTrips, getTrip, updateTrip } from '../controllers/trip.controller'
import { authMiddleware } from '../middlewares/auth'
import { checkAccess } from '../middlewares/checkAccess'

const tripRoutes:Router = Router()

tripRoutes.post('/create', authMiddleware, checkAccess('trip', 'write'), errorHandler(createtrip))
tripRoutes.get('/' , authMiddleware, checkAccess('trip', 'read'), errorHandler(getAllTrips))
tripRoutes.get('/:id' , authMiddleware, checkAccess('trip', 'read'), errorHandler(getTrip))
tripRoutes.put('/:id', authMiddleware, errorHandler(updateTrip))
tripRoutes.delete('/:id', authMiddleware, errorHandler(deleteTrip))

export default tripRoutes