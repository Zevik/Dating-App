import { Request, Response } from 'express';
import { createReport } from '../services/reportService';
import { createReportSchema } from '../validations/reportSchemas';
import { BadRequestError, NotFoundError, ConflictError } from '../errors/AppError';
import { ZodError } from 'zod';

/**
 * Report a user
 * @route POST /api/v1/reports
 */
export async function reportUserController(req: Request, res: Response) {
  const currentUserId = req.user?.userId;
  
  if (!currentUserId) {
    return res.status(401).json({ 
      success: false,
      message: 'Unauthorized: User ID not found in token payload' 
    });
  }
  
  try {
    // Validate input data using Zod
    const validData = createReportSchema.parse(req.body);
    
    // Create the report
    const report = await createReport(currentUserId, validData);
    
    res.status(201).json({
      success: true,
      message: 'User reported successfully',
      data: {
        id: report.id,
        created_at: report.created_at
      }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    } else if (error instanceof BadRequestError) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    } else if (error instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    } else if (error instanceof ConflictError) {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }
    
    // Let the global error handler deal with other errors
    throw error;
  }
} 