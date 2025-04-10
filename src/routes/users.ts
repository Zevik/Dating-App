import express from 'express';
import { getMyProfileController, updateMyProfileController } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// GET /api/v1/users/me - Protected route
router.get('/me', authenticate, getMyProfileController);

// PUT /api/v1/users/me - Protected route for updating profile
router.put('/me', authenticate, updateMyProfileController);

// Add other user routes later (e.g., update profile, get other users)

export default router; 