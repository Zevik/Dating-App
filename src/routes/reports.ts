import express from 'express';
import { reportUserController } from '../controllers/reportController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// All report routes require authentication
router.use(authenticate);

// Report a user
router.post('/', reportUserController);

export default router; 