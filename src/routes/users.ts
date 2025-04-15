import express from 'express';
import { getMyProfileController, updateMyProfileController, getDiscoveryCandidateController, getOnlineUsersController } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// GET /api/v1/users/me - Protected route
router.get('/me', authenticate, getMyProfileController);

// PUT /api/v1/users/me - Protected route for updating profile
router.put('/me', authenticate, updateMyProfileController);

// GET /api/v1/users/discovery - Protected route for discovering potential matches
router.get('/discovery', authenticate, getDiscoveryCandidateController);

// GET /api/v1/users/online - Protected route for getting online users
router.get('/online', authenticate, getOnlineUsersController);

// Add other user routes later (e.g., update profile, get other users)

export default router; 