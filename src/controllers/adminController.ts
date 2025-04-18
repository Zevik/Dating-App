import { Request, Response, NextFunction } from 'express';
import { getAllReports, updateReportStatus, updateReportNote } from '../services/reportService';
import { getAdminStats } from '../services/adminService';
import { updateReportStatusSchema, updateReportNoteSchema } from '../validations/reportSchemas';
import { ZodError } from 'zod';

/**
 * Get all reports for admin review
 * GET /api/v1/admin/reports
 */
export async function getAllReportsController(req: Request, res: Response, next: NextFunction) {
  try {
    const reports = await getAllReports();
    
    return res.status(200).json({
      success: true,
      count: reports.length,
      reports
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    next(error);
  }
}

/**
 * Update a report status
 * PATCH /api/v1/admin/reports/:id
 */
export async function updateReportStatusController(req: Request, res: Response, next: NextFunction) {
  try {
    const reportId = parseInt(req.params.id, 10);
    if (isNaN(reportId)) {
      return res.status(400).json({ message: 'Invalid report ID format' });
    }
    
    // Validate request body using Zod
    try {
      const validatedData = updateReportStatusSchema.parse(req.body);
      
      const updatedReport = await updateReportStatus(reportId, validatedData);
      
      return res.status(200).json({
        success: true,
        report: updatedReport
      });
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: validationError.flatten().fieldErrors
        });
      }
      throw validationError;
    }
  } catch (error) {
    console.error('Error updating report status:', error);
    next(error);
  }
}

/**
 * Update a report's admin note
 * PATCH /api/v1/admin/reports/:id/note
 */
export async function updateReportNoteController(req: Request, res: Response, next: NextFunction) {
  try {
    const reportId = parseInt(req.params.id, 10);
    if (isNaN(reportId)) {
      return res.status(400).json({ message: 'Invalid report ID format' });
    }
    
    // Validate request body using Zod
    try {
      const validatedData = updateReportNoteSchema.parse(req.body);
      
      const updatedReport = await updateReportNote(reportId, validatedData.note);
      
      return res.status(200).json({
        success: true,
        report: updatedReport
      });
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: validationError.flatten().fieldErrors
        });
      }
      throw validationError;
    }
  } catch (error) {
    console.error('Error updating report note:', error);
    next(error);
  }
}

/**
 * Get system statistics for admin dashboard
 * GET /api/v1/admin/stats
 */
export async function getAdminStatsController(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await getAdminStats();
    
    return res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching admin statistics:', error);
    next(error);
  }
} 