import { Router } from 'express'
import { PaymentController } from '../controllers/paymentController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.post('/create-payment-intent', authMiddleware, PaymentController.createPaymentIntent)
router.post('/webhook', PaymentController.handleWebhook)
router.get('/history', authMiddleware, PaymentController.getPaymentHistory)

export default router
