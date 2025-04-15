import express from 'express';
import { likeUserController, dislikeUserController } from '../controllers/matchController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// POST /api/v1/matches/like/:userId - Like a user
router.post('/like/:userId', authenticate, likeUserController);

// POST /api/v1/matches/dislike/:userId - Dislike a user
router.post('/dislike/:userId', authenticate, dislikeUserController);

export default router; 