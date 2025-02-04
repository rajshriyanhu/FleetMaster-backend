import { Router} from 'express'
import { errorHandler } from '../utils/errorHandler'
import { createCustomer, deleteCustomer, findCustomer, getAllCustomers, getCustomer, updateCustomer } from '../controllers/customer.controller'
import { authMiddleware } from '../middlewares/auth'

const customerRoutes:Router = Router()

customerRoutes.post('/create', authMiddleware, errorHandler(createCustomer))
customerRoutes.get('/' , authMiddleware, errorHandler(getAllCustomers))
customerRoutes.get('/:id' , authMiddleware, errorHandler(getCustomer))
customerRoutes.put('/:id', authMiddleware, errorHandler(updateCustomer))
customerRoutes.post('/find/:phone', authMiddleware, errorHandler(findCustomer))
customerRoutes.delete('/:id', authMiddleware, errorHandler(deleteCustomer))


export default customerRoutes