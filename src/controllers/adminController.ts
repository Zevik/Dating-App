import { Request, Response, NextFunction } from 'express';
import { getAllReports, updateReportStatus } from '../services/reportService';
import { updateReportStatusSchema } from '../validations/reportSchemas';
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