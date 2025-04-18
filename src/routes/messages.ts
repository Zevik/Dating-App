import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { 
  sendMessageController, 
  getMessagesController, 
  markMessagesReadController,
  getUnreadCountController
} from '../controllers/messageController';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// POST /api/v1/messages/:matchId - Send a message in a match
router.post('/:matchId', sendMessageController);

// GET /api/v1/messages/:matchId - Get messages for a match
router.get('/:matchId', getMessagesController);

// PATCH /api/v1/messages/read - Mark messages as read
router.patch('/read', markMessagesReadController);

// GET /api/v1/messages/unread/count - Get count of unread messages
router.get('/unread/count', getUnreadCountController);

export default router; 