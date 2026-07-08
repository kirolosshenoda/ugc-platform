import { Router } from 'express'
import { CampaignController } from '../controllers/campaignController.js'
import { authMiddleware } from '../middleware/auth.js'
import { validateRequest, schemas } from '../middleware/validation.js'

const router = Router()

router.post('/', authMiddleware, validateRequest(schemas.createCampaign), CampaignController.createCampaign)
router.get('/my-campaigns', authMiddleware, CampaignController.getMyCampaigns)
router.get('/', CampaignController.getAllCampaigns)
router.get('/:id', CampaignController.getCampaign)
router.put('/:id', authMiddleware, CampaignController.updateCampaign)
router.post('/:id/apply', authMiddleware, CampaignController.applyToCampaign)
router.post('/:campaignId/accept/:creatorId', authMiddleware, CampaignController.acceptCreator)
router.get('/:id/applications', authMiddleware, CampaignController.getApplications)

export default router
