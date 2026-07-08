import { Router } from 'express'
import { AuthController } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/auth.js'
import { validateRequest, schemas } from '../middleware/validation.js'

const router = Router()

router.post('/register', validateRequest(schemas.register), AuthController.register)
router.post('/login', validateRequest(schemas.login), AuthController.login)
router.get('/profile', authMiddleware, AuthController.getProfile)
router.post('/refresh', authMiddleware, AuthController.refreshToken)

export default router
