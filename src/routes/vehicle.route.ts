import {Router} from 'express'
import { errorHandler } from '../utils/errorHandler'
import { createVehicleEntry, deleteVehicle, getAllVehicles, getVehicle, updateVehicle } from '../controllers/vehicle.controller'
import { authMiddleware } from '../middlewares/auth'
import { checkAccess } from '../middlewares/checkAccess'

const vehicleRoutes:Router = Router()

vehicleRoutes.post('/create', authMiddleware, checkAccess("vehicle", "write"), errorHandler(createVehicleEntry))
vehicleRoutes.get('/', authMiddleware, checkAccess('vehicle', 'read'), errorHandler(getAllVehicles))
vehicleRoutes.get('/:id', authMiddleware, checkAccess("vehicle", "read"), errorHandler(getVehicle))
vehicleRoutes.put('/:id', authMiddleware, checkAccess("vehicle", "update"), errorHandler(updateVehicle))
vehicleRoutes.delete('/:id', authMiddleware, checkAccess("vehicle", "delete"), errorHandler(deleteVehicle))


export default vehicleRoutes