import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { logger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  statusCode: number;
  code: string;
  details?: Record<string, any>;

  constructor(
    statusCode: number,
    code: string,
    message: string,
    details?: Record<string, any>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Generate a unique request ID for tracking
  const requestId = uuidv4();
  
  // Log the error
  logger.error(`Request ${requestId} failed:`, {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  
  // Handle custom API errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      code: err.code,
      message: err.message,
      details: err.details,
      requestId,
    });
  }
  
  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle specific Prisma errors
    if (err.code === 'P2002') {
      // Unique constraint violation
      return res.status(409).json({
        status: 409,
        code: 'CONFLICT',
        message: 'A resource with this unique identifier already exists',
        details: {
          target: err.meta?.target,
        },
        requestId,
      });
    }
    
    if (err.code === 'P2025') {
      // Record not found
      return res.status(404).json({
        status: 404,
        code: 'NOT_FOUND',
        message: 'The requested resource was not found',
        requestId,
      });
    }
    
    // Generic Prisma error
    return res.status(500).json({
      status: 500,
      code: 'DATABASE_ERROR',
      message: 'A database error occurred',
      requestId,
    });
  }
  
  // Handle JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 401,
      code: 'UNAUTHORIZED',
      message: 'Invalid or expired token',
      requestId,
    });
  }
  
  // Generic error response
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  return res.status(statusCode).json({
    status: statusCode,
    code: 'INTERNAL_SERVER_ERROR',
    message: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message,
    requestId,
  });
}; 