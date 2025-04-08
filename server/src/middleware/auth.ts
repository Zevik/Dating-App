import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';
import { logger } from '../utils/logger';

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        isAdmin: boolean;
      };
    }
  }
}

/**
 * JWT Authentication middleware
 */
export const authenticateJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token from the header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 401,
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      });
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        status: 401,
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        isActive: true,
      },
    });
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        status: 401,
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired token',
      });
    }
    
    // Attach user info to request
    req.user = {
      id: user.id,
      email: user.email,
      isAdmin: false, // Default, will be set properly by isAdmin middleware
    };
    
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        status: 401,
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired token',
      });
    }
    
    next(error);
  }
};

/**
 * Admin authorization middleware
 * Must be used after authenticateJwt
 */
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 401,
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      });
    }
    
    // Check if user is an admin
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { isPremium: true },
    });
    
    // In a real app, you'd have a dedicated isAdmin field
    // For now, we'll use isPremium as a stand-in for admin privileges
    if (!user?.isPremium) {
      return res.status(403).json({
        status: 403,
        code: 'FORBIDDEN',
        message: 'Admin privileges required',
      });
    }
    
    // Update the isAdmin flag
    req.user.isAdmin = true;
    
    next();
  } catch (error) {
    logger.error('Admin authorization error:', error);
    next(error);
  }
}; 