import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import * as adminController from '../controllers/adminController';
import * as adminSchema from '../models/schemas/adminSchema';
import { isAdmin } from '../middleware/auth';

const router = Router();

// All admin routes require admin privileges
router.use(isAdmin);

/**
 * @route GET /api/v1/admin/users
 * @desc Get all users (with pagination)
 */
router.get(
  '/users',
  validateRequest(adminSchema.getUsersQuerySchema),
  adminController.getUsers
);

/**
 * @route GET /api/v1/admin/users/:userId
 * @desc Get user details
 */
router.get(
  '/users/:userId',
  validateRequest(adminSchema.getUserByIdSchema),
  adminController.getUserById
);

/**
 * @route PATCH /api/v1/admin/users/:userId/status
 * @desc Update user status (active/inactive)
 */
router.patch(
  '/users/:userId/status',
  validateRequest(adminSchema.updateUserStatusSchema),
  adminController.updateUserStatus
);

/**
 * @route GET /api/v1/admin/reports
 * @desc Get all reports (with pagination)
 */
router.get(
  '/reports',
  validateRequest(adminSchema.getReportsQuerySchema),
  adminController.getReports
);

/**
 * @route PATCH /api/v1/admin/reports/:reportId
 * @desc Update report status
 */
router.patch(
  '/reports/:reportId',
  validateRequest(adminSchema.updateReportSchema),
  adminController.updateReport
);

/**
 * @route GET /api/v1/admin/stats
 * @desc Get system statistics
 */
router.get(
  '/stats',
  validateRequest(adminSchema.getStatsQuerySchema),
  adminController.getStats
);

export default router; 