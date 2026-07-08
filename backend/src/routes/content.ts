import { Router } from 'express'
import { ContentController } from '../controllers/contentController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.post('/', authMiddleware, ContentController.uploadContent)
router.get('/featured', ContentController.getFeatured)
router.get('/:id', ContentController.getContent)
router.delete('/:id', authMiddleware, ContentController.deleteContent)
router.post('/:id/like', authMiddleware, ContentController.likeContent)
router.post('/:id/unlike', authMiddleware, ContentController.unlikeContent)

export default router
