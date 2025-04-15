import express from 'express';
import { likeUserController, dislikeUserController, getActiveMatchController } from '../controllers/matchController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/v1/matches/like/:userId - Like a user
router.post('/like/:userId', authenticate, likeUserController);

// POST /api/v1/matches/dislike/:userId - Dislike a user
router.post('/dislike/:userId', authenticate, dislikeUserController);

// GET /api/v1/matches/active - Get the user's active match
router.get('/active', authenticate, getActiveMatchController);

export default router; 