import { Router} from 'express'
import { errorHandler } from '../utils/errorHandler'
import { generateSignedUrl } from '../controllers/file.controller';

const fileRoutes:Router = Router()

fileRoutes.post('/generate-signed-url', errorHandler(generateSignedUrl));


export default fileRoutes