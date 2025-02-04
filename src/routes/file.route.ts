import { Router} from 'express'
import { errorHandler } from '../utils/errorHandler'
import { authMiddleware } from '../middlewares/auth'
import { generateSignedUrl } from '../controllers/file.controller';

const fileRoutes:Router = Router()

fileRoutes.post('/generate-signed-url', errorHandler(generateSignedUrl));
// fileRoutes.post('/delete-file', authMiddleware, errorHandler(deleteFile));
// fileRoutes.post('/upload-url', authMiddleware, errorHandler(uploadFile));


export default fileRoutes