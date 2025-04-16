import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/adminMiddleware';
import { 
  getAllReportsController, 
  updateReportStatusController,
  getAdminStatsController
} from '../controllers/adminController';

const router = express.Router();

// All admin routes require authentication and admin privileges
// GET /api/v1/admin/reports - Get all reports
router.get('/reports', authenticate, requireAdmin, getAllReportsController);

// PATCH /api/v1/admin/reports/:id - Update report status
router.patch('/reports/:id', authenticate, requireAdmin, updateReportStatusController);

// GET /api/v1/admin/stats - Get system statistics
router.get('/stats', authenticate, requireAdmin, getAdminStatsController);

export default router; 