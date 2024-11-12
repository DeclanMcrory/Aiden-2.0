import { Router } from 'express';
import { validateAuth } from '../middleware/auth.js';
import { taskController } from '../controllers/taskController.js';

const router = Router();

router.use(validateAuth);

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.post('/:id/assign', taskController.assignTask);
router.patch('/:id/status', taskController.updateTaskStatus);

export { router as taskRoutes };