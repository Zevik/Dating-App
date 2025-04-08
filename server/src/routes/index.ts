import { Express } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import matchRoutes from './matchRoutes';
import callRoutes from './callRoutes';
import adminRoutes from './adminRoutes';
import { authenticateJwt } from '../middleware/auth';

/**
 * Setup all API routes
 */
export const setupRoutes = (app: Express): void => {
  // API routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/users', authenticateJwt, userRoutes);
  app.use('/api/v1/matches', authenticateJwt, matchRoutes);
  app.use('/api/v1/calls', authenticateJwt, callRoutes);
  app.use('/api/v1/admin', authenticateJwt, adminRoutes);

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ 
      status: 404, 
      code: 'NOT_FOUND', 
      message: 'The requested resource was not found' 
    });
  });
}; 