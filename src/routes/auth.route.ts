import { Router} from 'express'
import { adminSignUp, allUsers, getAlltenants, getLoggedInUser, login, logout, signUp, updateAccess } from '../controllers/auth.controller'
import { errorHandler } from '../utils/errorHandler'
import { authMiddleware } from '../middlewares/auth'
import { checkAccess } from '../middlewares/checkAccess'

const authRoutes:Router = Router()

authRoutes.get('/tenant', errorHandler(getAlltenants))
authRoutes.post('/admin', errorHandler(adminSignUp))
authRoutes.post('/login', errorHandler(login))
authRoutes.post('/signup', errorHandler(signUp))
authRoutes.get('/loggedInUser', authMiddleware , errorHandler(getLoggedInUser))
authRoutes.post("/logout", authMiddleware, errorHandler(logout))
authRoutes.get("/allUsers", authMiddleware, checkAccess('user', 'read'), errorHandler(allUsers))
authRoutes.post("/access", authMiddleware, errorHandler(updateAccess))

export default authRoutes