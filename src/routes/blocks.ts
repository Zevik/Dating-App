import express from 'express';
import { blockUserController, getBlockedUsersController, unblockUserController } from '../controllers/blockController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// All block routes require authentication
router.use(authenticate);

// Block a user
router.post('/:userId', blockUserController);

// Unblock a user
router.delete('/:userId', unblockUserController);

// Get all blocked users
router.get('/', getBlockedUsersController);

export default router; 