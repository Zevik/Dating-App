import express from 'express';
import { startCallController, getCallHistoryController } from '../controllers/callController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/v1/calls/start/:matchId - Start a new call in an active match
router.post('/start/:matchId', authenticate, startCallController);

// GET /api/v1/calls/history - Get user's call history
router.get('/history', authenticate, getCallHistoryController);

export default router; 