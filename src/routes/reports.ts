import express from 'express';
import { reportUserController, getUserReportsController } from '../controllers/reportController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// All report routes require authentication
router.use(authenticate);

// Report a user
router.post('/', reportUserController);

// Get all reports created by the current user
router.get('/', getUserReportsController);

export default router; 