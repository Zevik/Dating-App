import { Request, Response, NextFunction } from 'express';
import { likeUser, dislikeUser, getActiveMatchForUser, endMatch, getMatchHistory } from '../services/matchService';
import { parsePaginationParams } from '../utils/paginationUtils';
import { isUserOnline } from '../services/userService';
import { isBlocked } from '../services/blockService';
import { hasReportBetweenUsers } from '../services/reportService';
import { ForbiddenError } from '../errors/AppError';

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

    // Determine partner user ID and get partner data
    const partnerId = match.user1_id === userId ? match.user2_id : match.user1_id;
    const partnerData = match.user1_id === userId ? match.user2 : match.user1;
    
    // Check if either user has blocked the other or if there's a report between them
    const [blockExists, reportExists] = await Promise.all([
      isBlocked(userId, partnerId),
      hasReportBetweenUsers(userId, partnerId)
    ]);
    
    if (blockExists) {
      return res.status(403).json({ 
        success: false,
        message: 'Forbidden: This match is unavailable due to a block between users' 
      });
    }
    
    if (reportExists) {
      return res.status(403).json({ 
        success: false,
        message: 'Forbidden: This match is unavailable due to a report between users' 
      });
    }
    
    // Check if partner is online
    const isPartnerOnline = await isUserOnline(partnerId);
    
    // Create a response with the right structure
    const formattedMatch = {
      id: match.id,
      matched_at: match.matched_at,
      is_active: match.is_active,
      closed_at: match.closed_at,
      close_reason: match.close_reason,
      last_interaction_at: match.last_interaction_at,
      user1: match.user1,
      user2: match.user2,
      partner: {
        id: partnerId,
        display_name: partnerData.display_name,
        profile_image_url: partnerData.profile_image_url,
        status_message: partnerData.status_message || ""
      },
      is_partner_online: isPartnerOnline
    };

    res.status(200).json(formattedMatch);
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

/**
 * Get user's match history
 * GET /api/v1/matches/history
 * Support pagination with query parameters: page, limit
 */
export async function getMatchHistoryController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Parse pagination parameters from query
    const pagination = parsePaginationParams(req.query);

    // Get paginated match history
    const result = await getMatchHistory(userId, pagination);

    // No need to check for empty data, just return what we have with the count
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching match history:', error);
    next(error);
  }
} 