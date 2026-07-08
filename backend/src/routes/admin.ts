import { Router } from 'express'
import { AdminController } from '../controllers/adminController.js'
import { authMiddleware, adminMiddleware } from '../middleware/auth.js'

const router = Router()

router.use(authMiddleware, adminMiddleware)

router.get('/users', AdminController.getAllUsers)
router.get('/stats', AdminController.getPlatformStats)
router.get('/user-stats', AdminController.getUserStats)
router.post('/ban/:userId', AdminController.banUser)
router.post('/unban/:userId', AdminController.unbanUser)
router.post('/verify-creator/:creatorId', AdminController.verifyCreator)
router.post('/moderate/:contentId', AdminController.moderateContent)

export default router
