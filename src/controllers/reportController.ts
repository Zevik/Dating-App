import { Request, Response } from 'express';
import { createReport, getUserReports } from '../services/reportService';
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
        created_at: report.created_at,
        has_recording: !!report.recording_url
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

/**
 * Get all reports created by the current user
 * @route GET /api/v1/reports
 */
export async function getUserReportsController(req: Request, res: Response) {
  const currentUserId = req.user?.userId;
  
  if (!currentUserId) {
    return res.status(401).json({ 
      success: false,
      message: 'Unauthorized: User ID not found in token payload' 
    });
  }
  
  try {
    // Get reports
    const reports = await getUserReports(currentUserId);
    
    // Transform the data to match the expected format
    const formattedReports = reports.map(report => {
      // First check if reported exists and extract values safely
      const reportedUser = report.reported ? {
        id: report.reported.id,
        display_name: report.reported.display_name,
        profile_image_url: report.reported.profile_image_url
      } : null;
      
      return {
        id: report.id,
        reason: report.reason,
        created_at: report.created_at,
        reported_user: reportedUser
      };
    });
    
    res.status(200).json({
      success: true,
      data: formattedReports
    });
  } catch (error) {
    // Let the global error handler deal with errors
    throw error;
  }
} 