import express from 'express';
import { startCallController, getCallHistoryController, endCallController, getActiveCallController, getCallChainController } from '../controllers/callController';
import { authenticate } from '../middleware/authMiddleware';
import { supabase } from '../lib/supabaseClient';
import redis from '../lib/redisClient';

const router = express.Router();

// POST /api/v1/calls/start/:matchId - Start a new call in an active match
router.post('/start/:matchId', authenticate, startCallController);

// GET /api/v1/calls/history - Get user's call history
router.get('/history', authenticate, getCallHistoryController);

// POST /api/v1/calls/end/:callId - End an existing call
router.post('/end/:callId', authenticate, endCallController);

// GET /api/v1/calls/active - Get user's active call
router.get('/active', authenticate, getActiveCallController);

// GET /api/v1/calls/chain/:matchId - Get chain of calls for a specific match
router.get('/chain/:matchId', authenticate, getCallChainController);

/**
 * POST /api/v1/calls/save-recording
 * Receives a recording at the end of a call and saves it to Supabase Storage
 */
router.post('/save-recording', async (req, res, next) => {
  try {
    const { userId, otherUserId, base64Audio } = req.body;

    if (!userId || !otherUserId || !base64Audio) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const filename = `recordings/${Date.now()}_${userId}_${otherUserId}.webm`;
    const buffer = Buffer.from(base64Audio, "base64");

    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_STORAGE_BUCKET!)
      .upload(filename, buffer, {
        contentType: "audio/webm",
        upsert: false,
      });

    if (error) throw error;

    const { publicUrl } = supabase.storage
      .from(process.env.SUPABASE_STORAGE_BUCKET!)
      .getPublicUrl(filename).data;

    // Store temporarily in Redis for 5 minutes
    try {
      await redis.setEx(`recording:${userId}:${otherUserId}`, 300, publicUrl);
    } catch (e) {
      console.warn("Redis not available – skipping temporary storage of recording URL in dev.", e);
    }

    res.json({ success: true, url: publicUrl });
  } catch (e) {
    next(e);
  }
});

export default router; 