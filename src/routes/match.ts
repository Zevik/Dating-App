import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import prisma from '../lib/prisma';

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

export default router; 