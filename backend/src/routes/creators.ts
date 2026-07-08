import { Router } from 'express'
import { CreatorController } from '../controllers/creatorController.js'
import { authMiddleware } from '../middleware/auth.js'
import { validateRequest, schemas } from '../middleware/validation.js'

const router = Router()

router.post('/', authMiddleware, validateRequest(schemas.createCreator), CreatorController.createProfile)
router.get('/me', authMiddleware, CreatorController.getMyProfile)
router.get('/search', CreatorController.searchCreators)
router.get('/', CreatorController.getAllCreators)
router.get('/:id', CreatorController.getProfile)
router.put('/:id', authMiddleware, CreatorController.updateProfile)
router.get('/:id/content', CreatorController.getContent)
router.get('/:id/reviews', CreatorController.getReviews)

export default router
