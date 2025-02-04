import { Router} from 'express'
import { errorHandler } from '../utils/errorHandler'
import { localBilling, localBooking, localQuotation, lumpsumBilling, lumpsumBooking, lumpsumQuotation, outstationBilling, outstationBooking, outstationQuotation } from '../controllers/form.controller'
import { authMiddleware } from '../middlewares/auth'

const formRoutes:Router = Router()

formRoutes.post('/localquotation', authMiddleware, errorHandler(localQuotation));
formRoutes.post('/localbooking', authMiddleware, errorHandler(localBooking));
formRoutes.post('/localbilling', authMiddleware, errorHandler(localBilling));
formRoutes.post('/outstationquotation', authMiddleware, errorHandler(outstationQuotation));
formRoutes.post('/outstationbooking', authMiddleware, errorHandler(outstationBooking));
formRoutes.post('/outstationbilling', authMiddleware, errorHandler(outstationBilling));
formRoutes.post('/lumpsumquotation', authMiddleware, errorHandler(lumpsumQuotation));
formRoutes.post('/lumpsumbooking', authMiddleware, errorHandler(lumpsumBooking));
formRoutes.post('/lumpsumbilling', authMiddleware, errorHandler(lumpsumBilling));


export default formRoutes