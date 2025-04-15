import express from 'express';
import { startCallController } from '../controllers/callController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/v1/calls/start/:matchId - Start a new call in an active match
router.post('/start/:matchId', authenticate, startCallController);

export default router; 