import { Router } from 'express'
import { MessageController } from '../controllers/messageController.js'
import { authMiddleware } from '../middleware/auth.js'
import { validateRequest, schemas } from '../middleware/validation.js'

const router = Router()

router.post('/', authMiddleware, validateRequest(schemas.createMessage), MessageController.sendMessage)
router.get('/conversations', authMiddleware, MessageController.getConversations)
router.get('/unread', authMiddleware, MessageController.getUnreadCount)
router.get('/:userId', authMiddleware, MessageController.getConversation)

export default router
