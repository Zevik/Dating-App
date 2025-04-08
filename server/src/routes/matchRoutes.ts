import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest';
import * as matchController from '../controllers/matchController';
import * as matchSchema from '../models/schemas/matchSchema';

const router = Router();

/**
 * @route POST /api/v1/matches/like/:userId
 * @desc Like a user
 */
router.post(
  '/like/:userId',
  validateRequest(matchSchema.likeUserSchema),
  matchController.likeUser
);

/**
 * @route POST /api/v1/matches/dislike/:userId
 * @desc Dislike a user
 */
router.post(
  '/dislike/:userId',
  validateRequest(matchSchema.dislikeUserSchema),
  matchController.dislikeUser
);

/**
 * @route GET /api/v1/matches/active
 * @desc Get active matches
 */
router.get(
  '/active',
  validateRequest(matchSchema.getMatchesQuerySchema),
  matchController.getActiveMatches
);

/**
 * @route POST /api/v1/matches/:matchId/end
 * @desc End a match
 */
router.post(
  '/:matchId/end',
  validateRequest(matchSchema.endMatchSchema),
  matchController.endMatch
);

/**
 * @route GET /api/v1/matches/history
 * @desc Get match history
 */
router.get(
  '/history',
  validateRequest(matchSchema.getMatchesQuerySchema),
  matchController.getMatchHistory
);

export default router; 