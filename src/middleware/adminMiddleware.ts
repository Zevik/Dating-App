import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { ForbiddenError } from '../errors/AppError';

/**
 * Middleware to require admin privileges for a route
 * Must be used after the authenticate middleware
 */
export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: Authentication required' });
    }
    
    // Check if the user has admin role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { is_admin: true }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!user.is_admin) {
      throw new ForbiddenError('Admin privileges required');
    }
    
    // If user is admin, proceed to the next middleware or route handler
    console.log(`Admin access granted for user ID: ${userId}`);
    next();
  } catch (error) {
    next(error);
  }
}; 