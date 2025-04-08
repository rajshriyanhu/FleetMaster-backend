import {RequestHandler, Router} from 'express'
import { authMiddleware } from '../middlewares/auth'
import { errorHandler } from '../utils/errorHandler'
import { cancelInvite, getAllInvites, inviteUser, resendInvite } from '../controllers/invite.controller'

const inviteRoutes : Router = Router()

inviteRoutes.get('/', authMiddleware, errorHandler(getAllInvites))
inviteRoutes.post('/', authMiddleware , errorHandler(inviteUser))
inviteRoutes.post('/cancel/:id', authMiddleware , errorHandler(cancelInvite))
inviteRoutes.post('/resend/:id', authMiddleware , errorHandler(resendInvite))

export default inviteRoutes