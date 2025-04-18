import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import prisma from '../lib/prisma';
import { getMessagesController, sendMessageController } from '../controllers/messageController';

const router = express.Router();

// GET /api/v1/match/active - Get active match in simplified format
router.get('/active', authenticate, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const match = await prisma.match.findFirst({
      where: {
        OR: [
          { user1_id: userId },
          { user2_id: userId },
        ],
        is_active: true, // Active match (equivalent to ended_at: null)
      },
      include: {
        user1: { select: { id: true, display_name: true, profile_image_url: true } },
        user2: { select: { id: true, display_name: true, profile_image_url: true } },
      },
    });

    if (!match) return res.json({ match: null });

    const otherUser = match.user1_id === userId ? match.user2 : match.user1;

    res.json({
      match: {
        id: match.id,
        started_at: match.matched_at, // Using matched_at as started_at
        other_user: {
          id: otherUser.id,
          name: otherUser.display_name,
          avatar_url: otherUser.profile_image_url,
        },
      },
    });
  } catch (e) {
    next(e);
  }
});

// POST /api/v1/match/:id/start-call - Start a call for a specific match
router.post('/:id/start-call', authenticate, async (req, res, next) => {
  try {
    const matchId = Number(req.params.id);
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const match = await prisma.match.findUnique({ where: { id: matchId } });

    if (!match || (match.user1_id !== userId && match.user2_id !== userId)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (match.call_started_at) {
      return res.status(400).json({ error: "Call already started" });
    }

    const updated = await prisma.match.update({
      where: { id: matchId },
      data: { call_started_at: new Date() },
    });

    res.json({ success: true, match: updated });
  } catch (e) {
    next(e);
  }
});

// POST /api/v1/match/:id/accept-call - Accept a call for a specific match
router.post('/:id/accept-call', authenticate, async (req, res, next) => {
  try {
    const matchId = Number(req.params.id);
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const match = await prisma.match.findUnique({ where: { id: matchId } });

    if (!match || (match.user1_id !== userId && match.user2_id !== userId)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (!match.call_started_at) {
      return res.status(400).json({ error: "No call has been started" });
    }

    if (match.call_accepted_at) {
      return res.status(400).json({ error: "Call already accepted" });
    }

    const updated = await prisma.match.update({
      where: { id: matchId },
      data: { call_accepted_at: new Date() },
    });

    res.json({ success: true, match: updated });
  } catch (e) {
    next(e);
  }
});

// POST /api/v1/match/:id/reject-call - Reject a call for a specific match
router.post('/:id/reject-call', authenticate, async (req, res, next) => {
  try {
    const matchId = Number(req.params.id);
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const match = await prisma.match.findUnique({ where: { id: matchId } });

    if (!match || (match.user1_id !== userId && match.user2_id !== userId)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (!match.call_started_at) {
      return res.status(400).json({ error: "No call has been started" });
    }

    if (match.call_rejected_at) {
      return res.status(400).json({ error: "Call already rejected" });
    }

    const updated = await prisma.match.update({
      where: { id: matchId },
      data: { call_rejected_at: new Date() },
    });

    res.json({ success: true, match: updated });
  } catch (e) {
    next(e);
  }
});

// GET /api/v1/match/:id/call-status - Get call status for a specific match
router.get('/:id/call-status', authenticate, async (req, res, next) => {
  try {
    const matchId = Number(req.params.id);
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const match = await prisma.match.findUnique({ where: { id: matchId } });

    if (!match || (match.user1_id !== userId && match.user2_id !== userId)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json({
      call_status: {
        match_id: match.id,
        call_started_at: match.call_started_at,
        call_accepted_at: match.call_accepted_at,
        call_rejected_at: match.call_rejected_at,
        status: getCallStatus(match),
      }
    });
  } catch (e) {
    next(e);
  }
});

// GET /api/v1/match/:id/messages - Get messages for a specific match
router.get('/:id/messages', authenticate, getMessagesController);

// POST /api/v1/match/:id/messages - Send a message to a specific match
router.post('/:id/messages', authenticate, sendMessageController);

// Helper function to determine call status
function getCallStatus(match: any) {
  if (!match.call_started_at) return 'none';
  if (match.call_rejected_at) return 'rejected';
  if (match.call_accepted_at) return 'accepted';
  return 'pending';
}

export default router; 