import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { logger } from '../utils/logger';

/**
 * Middleware to validate request against a Zod schema
 */
export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body, query params, and URL params against schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      next();
    } catch (error) {
      logger.debug('Validation error:', error);
      
      if (error instanceof ZodError) {
        // Format Zod errors into a more user-friendly format
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        
        return res.status(400).json({
          status: 400,
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details: formattedErrors,
        });
      }
      
      // If it's not a ZodError, pass to the next error handler
      next(error);
    }
  };
}; 