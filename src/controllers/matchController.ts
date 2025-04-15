import { Request, Response, NextFunction } from 'express';
import { likeUser, dislikeUser, getActiveMatchForUser, endMatch } from '../services/matchService';

/**
 * Handle like request from one user to another
 * POST /api/v1/matches/like/:userId
 */
export async function likeUserController(req: Request, res: Response, next: NextFunction) {
  try {
    // Get current user ID from auth token
    const fromUserId = req.user?.userId;
    if (!fromUserId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    // Get target user ID from URL parameter
    const toUserId = parseInt(req.params.userId, 10);
    if (isNaN(toUserId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Call service to create like and check for match
    const result = await likeUser(fromUserId, toUserId);

    // Return response
    return res.status(200).json({
      success: true,
      like: result.like,
      match: result.match, // Will be null if no match created
      isMatch: !!result.match // Boolean indicating if there's a match
    });
  } catch (error) {
    console.error('Error in likeUserController:', error);
    next(error);
  }
}

/**
 * Handle dislike request from one user to another
 * POST /api/v1/matches/dislike/:userId
 */
export async function dislikeUserController(req: Request, res: Response, next: NextFunction) {
  try {
    // Get current user ID from auth token
    const fromUserId = req.user?.userId;
    if (!fromUserId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    // Get target user ID from URL parameter
    const toUserId = parseInt(req.params.userId, 10);
    if (isNaN(toUserId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Call service to create dislike
    const result = await dislikeUser(fromUserId, toUserId);

    // Return response
    return res.status(200).json({
      success: true,
      dislike: result.dislike
    });
  } catch (error) {
    console.error('Error in dislikeUserController:', error);
    next(error);
  }
}

/**
 * Get the user's active match
 * GET /api/v1/matches/active
 */
export async function getActiveMatchController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const match = await getActiveMatchForUser(userId);

    if (!match) {
      return res.status(404).json({ message: 'No active match found' });
    }

    res.status(200).json(match);
  } catch (error) {
    console.error('Error fetching active match:', error);
    next(error);
  }
}

/**
 * End an active match
 * POST /api/v1/matches/:matchId/end
 */
export async function endMatchController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const matchId = parseInt(req.params.matchId, 10);
    if (isNaN(matchId)) {
      return res.status(400).json({ message: 'Invalid match ID format' });
    }

    try {
      const updatedMatch = await endMatch(matchId, userId);
      return res.status(200).json({
        success: true,
        match: updatedMatch
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Match not found') {
          return res.status(404).json({ message: 'Match not found' });
        } else if (error.message === 'User not part of this match') {
          return res.status(403).json({ message: 'Unauthorized: You are not part of this match' });
        } else if (error.message === 'Match already inactive') {
          return res.status(400).json({ message: 'Match is already inactive' });
        }
      }
      throw error; // Re-throw for the outer catch
    }
  } catch (error) {
    console.error('Error ending match:', error);
    next(error);
  }
} 