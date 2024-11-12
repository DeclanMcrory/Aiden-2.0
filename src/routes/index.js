import { agentRoutes } from './agentRoutes.js';
import { taskRoutes } from './taskRoutes.js';
import { logger } from '../utils/logger.js';

export const setupRoutes = (app) => {
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // API routes
  app.use('/api/v1/agents', agentRoutes);
  app.use('/api/v1/tasks', taskRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'Route not found'
    });
  });

  logger.info('Routes initialized successfully');
};