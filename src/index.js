import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import { connectDB } from './config/database.js';
import { setupRoutes } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

// Load environment variables before any other operation
config();

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB().then(() => {
  // Setup routes only after successful DB connection
  setupRoutes(app);
  
  // Error handling middleware
  app.use(errorHandler);
  
  // Start server
  app.listen(port, () => {
    logger.info(`A.I.D.E.N. server running on port ${port}`);
  });
}).catch(error => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});