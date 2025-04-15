import express from 'express';
import { likeUserController, dislikeUserController, getActiveMatchController, endMatchController, getMatchHistoryController } from '../controllers/matchController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/v1/matches/like/:userId - Like a user
router.post('/like/:userId', authenticate, likeUserController);

// POST /api/v1/matches/dislike/:userId - Dislike a user
router.post('/dislike/:userId', authenticate, dislikeUserController);

// GET /api/v1/matches/active - Get the user's active match
router.get('/active', authenticate, getActiveMatchController);

// POST /api/v1/matches/:matchId/end - End an active match
router.post('/:matchId/end', authenticate, endMatchController);

// GET /api/v1/matches/history - Get user's match history
router.get('/history', authenticate, getMatchHistoryController);

export default router; 