import { Router} from 'express'
import { errorHandler } from '../utils/errorHandler'
import { createCustomer, deleteCustomer, findCustomer, getAllCustomers, getCustomer, updateCustomer } from '../controllers/customer.controller'
import { authMiddleware } from '../middlewares/auth'
import { checkAccess } from '../middlewares/checkAccess'

const customerRoutes:Router = Router()

customerRoutes.post('/create', authMiddleware, checkAccess("customer", "write"), errorHandler(createCustomer))
customerRoutes.get('/' , authMiddleware, checkAccess("customer", "read"), errorHandler(getAllCustomers))
customerRoutes.get('/:id' , authMiddleware, checkAccess("customer", "read"), errorHandler(getCustomer))
customerRoutes.put('/:id', authMiddleware, checkAccess("customer", "update"), errorHandler(updateCustomer))
customerRoutes.post('/find/:phone', authMiddleware, checkAccess("customer", "read"), errorHandler(findCustomer))
customerRoutes.delete('/:id', authMiddleware, checkAccess("customer", "delete"), errorHandler(deleteCustomer))


export default customerRoutes