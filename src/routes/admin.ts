import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/adminMiddleware';
import { 
  getAllReportsController, 
  updateReportStatusController,
  getAdminStatsController,
  updateReportNoteController
} from '../controllers/adminController';
import prisma from '../lib/prisma';

const router = express.Router();

// All admin routes require authentication and admin privileges
// GET /api/v1/admin/reports - Get all reports
router.get('/reports', authenticate, requireAdmin, getAllReportsController);

// PATCH /api/v1/admin/reports/:id - Update report status
router.patch('/reports/:id', authenticate, requireAdmin, updateReportStatusController);

// POST /api/v1/admin/reports/:id/status - Update report status (alternative endpoint)
router.post('/reports/:id/status', authenticate, requireAdmin, updateReportStatusController);

// PATCH /api/v1/admin/reports/:id/note - Update admin note for a report
router.patch('/reports/:id/note', authenticate, requireAdmin, updateReportNoteController);

// GET /api/v1/admin/stats - Get system statistics
router.get('/stats', authenticate, requireAdmin, getAdminStatsController);

export default router; 