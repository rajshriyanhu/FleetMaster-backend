import { Router} from 'express'
import { errorHandler } from '../utils/errorHandler'
import { createExpense, deleteExpense, getAllExpenses, getExpense, updateExpense } from '../controllers/expense.controller'
import { authMiddleware } from '../middlewares/auth'
import { checkAccess } from '../middlewares/checkAccess'

const expenseRoutes:Router = Router()

expenseRoutes.post('/create', authMiddleware, checkAccess("expense", "write"), errorHandler(createExpense))
expenseRoutes.get('/:id' , authMiddleware, checkAccess("expense", "read"), errorHandler(getAllExpenses))
expenseRoutes.put('/:id', authMiddleware, checkAccess("expense", "update"), errorHandler(updateExpense))
expenseRoutes.delete('/:id', authMiddleware, checkAccess("expense", "delete"), errorHandler(deleteExpense))


export default expenseRoutes