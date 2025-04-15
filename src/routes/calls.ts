import express from 'express';
import { startCallController, getCallHistoryController, endCallController, getActiveCallController, getCallChainController } from '../controllers/callController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/v1/calls/start/:matchId - Start a new call in an active match
router.post('/start/:matchId', authenticate, startCallController);

// GET /api/v1/calls/history - Get user's call history
router.get('/history', authenticate, getCallHistoryController);

// POST /api/v1/calls/end/:callId - End an existing call
router.post('/end/:callId', authenticate, endCallController);

// GET /api/v1/calls/active - Get user's active call
router.get('/active', authenticate, getActiveCallController);

// GET /api/v1/calls/chain/:matchId - Get chain of calls for a specific match
router.get('/chain/:matchId', authenticate, getCallChainController);

export default router; 