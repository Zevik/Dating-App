import { Request, Response, NextFunction } from 'express';
import { likeUser, dislikeUser } from '../services/matchService';

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