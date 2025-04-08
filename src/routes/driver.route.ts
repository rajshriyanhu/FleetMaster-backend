import { Router} from 'express'
import { errorHandler } from '../utils/errorHandler'
import { createDriver, deleteDriver, getAllDriver, getDriver, updateDriver } from '../controllers/driver.controller'
import { authMiddleware } from '../middlewares/auth'
import { checkAccess } from '../middlewares/checkAccess'

const driverRoutes:Router = Router()

driverRoutes.post('/create', authMiddleware, checkAccess("driver", "write"), errorHandler(createDriver))
driverRoutes.get('/' , authMiddleware, checkAccess("driver", "read"), errorHandler(getAllDriver))
driverRoutes.get('/:id' , authMiddleware, checkAccess("driver", "read"), errorHandler(getDriver))
driverRoutes.put('/:id', authMiddleware, checkAccess("driver", "update"), errorHandler(updateDriver))
driverRoutes.delete('/:id', authMiddleware, checkAccess("driver", "delete"), errorHandler(deleteDriver))


export default driverRoutes