import { Router } from 'express'
import { ReviewController } from '../controllers/reviewController.js'
import { authMiddleware } from '../middleware/auth.js'
import { validateRequest, schemas } from '../middleware/validation.js'

const router = Router()

router.post('/', authMiddleware, validateRequest(schemas.createReview), ReviewController.createReview)
router.get('/:id', ReviewController.getCreatorReviews)
router.put('/:id', authMiddleware, ReviewController.updateReview)
router.delete('/:id', authMiddleware, ReviewController.deleteReview)

export default router
