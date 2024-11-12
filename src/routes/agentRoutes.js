import { Router } from 'express';
import { validateAuth } from '../middleware/auth.js';
import { agentController } from '../controllers/agentController.js';

const router = Router();

router.use(validateAuth);

router.get('/', agentController.getAllAgents);
router.get('/:id', agentController.getAgentById);
router.post('/', agentController.createAgent);
router.patch('/:id/status', agentController.updateAgentStatus);

export { router as agentRoutes };