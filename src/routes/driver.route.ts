import { Router} from 'express'
import { errorHandler } from '../utils/errorHandler'
import { createDriver, deleteDriver, getAllDriver, getDriver, updateDriver } from '../controllers/driver.controller'
import { authMiddleware } from '../middlewares/auth'

const driverRoutes:Router = Router()

driverRoutes.post('/create', errorHandler(createDriver))
driverRoutes.get('/' , authMiddleware, errorHandler(getAllDriver))
driverRoutes.get('/:id' , authMiddleware, errorHandler(getDriver))
driverRoutes.put('/:id', authMiddleware, errorHandler(updateDriver))
driverRoutes.delete('/:id', authMiddleware, errorHandler(deleteDriver))


export default driverRoutes