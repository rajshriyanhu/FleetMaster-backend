import { Router} from 'express'
import { errorHandler } from '../utils/errorHandler'
import { createExpense, deleteExpense, getAllExpenses, getExpense, updateExpense } from '../controllers/expense.controller'
import { authMiddleware } from '../middlewares/auth'

const expenseRoutes:Router = Router()

expenseRoutes.post('/create', authMiddleware, errorHandler(createExpense))
expenseRoutes.get('/:id' , authMiddleware, errorHandler(getAllExpenses))
expenseRoutes.put('/:id', authMiddleware, errorHandler(updateExpense))
expenseRoutes.delete('/:id', authMiddleware, errorHandler(deleteExpense))


export default expenseRoutes