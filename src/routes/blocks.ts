import express from 'express';
import { blockUserController, getBlockedUsersController, unblockUserController } from '../controllers/blockController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// All block routes require authentication
router.use(authenticate);

// Block a user (with userId in request body)
router.post('/', (req, res) => {
  // If userId is not in URL params, it should be in the request body
  if (!req.body.blocked_user_id) {
    return res.status(400).json({ 
      success: false,
      message: 'Missing blocked_user_id in request body' 
    });
  }
  
  // Add userId to params and call the controller
  req.params = { 
    ...req.params,
    userId: req.body.blocked_user_id.toString() 
  };
  blockUserController(req, res);
});

// Block a user (with userId in URL)
router.post('/:userId', blockUserController);

// Unblock a user
router.delete('/:userId', unblockUserController);

// Get all blocked users
router.get('/', getBlockedUsersController);

export default router; 