import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';

import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import { setupRoutes } from './routes';
import { setupWebsocket } from './websocket';
import { connectRedis } from './config/redis';
import { PrismaClient } from '@prisma/client';

// Create Express app
const app = express();

// Initialize HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(', '),
    credentials: true,
  },
});

// Initialize Prisma
export const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(', '),
  credentials: true,
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Health check endpoint
app.get('/health/liveness', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/health/readiness', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    // Check Redis connection
    await connectRedis();
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({ status: 'error', message: 'Service unavailable' });
  }
});

// Setup API routes
setupRoutes(app);

// Setup WebSocket
setupWebsocket(io);

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Rejection:', reason);
});

// Graceful shutdown
const gracefulShutdown = async () => {
  logger.info('Shutting down gracefully...');
  
  // Close server
  server.close(() => {
    logger.info('HTTP server closed');
  });
  
  // Disconnect prisma
  await prisma.$disconnect();
  logger.info('Database connections closed');
  
  // Exit process
  process.exit(0);
};

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default server; 