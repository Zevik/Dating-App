import { Request, Response, NextFunction } from 'express';
import { startCall, getCallHistoryForUser, endCall, getActiveCallForUser, getCallChainForMatch } from '../services/callService';
import prisma from '../lib/prisma';
import { z } from 'zod';
import { normalizeBigInts } from '../utils/jsonUtils';
import { parsePaginationParams } from '../utils/paginationUtils';
import { isUserOnline } from '../services/userService';
import { isBlocked } from '../services/blockService';
import { hasReportBetweenUsers } from '../services/reportService';
import { NotFoundError, ForbiddenError } from '../errors/AppError';

// Schema for validating request body
const startCallSchema = z.object({
  callType: z.enum(['voice', 'video']),
});

/**
 * Get the call history for a user
 * GET /api/v1/calls/history
 * Support pagination with query parameters: page, limit
 */
export async function getCallHistoryController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Parse pagination parameters from query
    const pagination = parsePaginationParams(req.query);
    
    // Get paginated call history
    const result = await getCallHistoryForUser(userId, pagination);
    
    // Normalize any BigInt values before sending as JSON
    const normalizedResult = normalizeBigInts(result);
    
    // No need to check for empty data, just return what we have with the count
    res.status(200).json(normalizedResult);
  } catch (error) {
    console.error("Error fetching call history:", error);
    next(error);
  }
}

/**
 * End an existing call
 * POST /api/v1/calls/end/:callId
 */
export async function endCallController(req: Request, res: Response, next: NextFunction) {
  try {
    // Get the user ID from the token
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    // Get the call ID from URL parameters and convert to BigInt/number
    const callIdParam = req.params.callId;
    if (!callIdParam) {
      return res.status(400).json({ message: 'Call ID is required' });
    }
    
    // Try to parse the callId as a number
    const callId = parseInt(callIdParam, 10);
    if (isNaN(callId)) {
      return res.status(400).json({ message: 'Invalid call ID format' });
    }

    try {
      // End the call
      const updatedCall = await endCall(callId, userId);
      
      // Normalize BigInt values before sending as JSON
      const normalizedCall = normalizeBigInts(updatedCall);
      
      return res.status(200).json({
        success: true,
        call: normalizedCall
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Call not found') {
          return res.status(404).json({ message: 'Call not found' });
        } else if (error.message === 'User not part of this call') {
          return res.status(403).json({ message: 'Unauthorized: You are not part of this call' });
        } else if (error.message === 'Call is already ended') {
          return res.status(400).json({ message: 'Call is already ended' });
        }
      }
      throw error; // Re-throw for the outer catch
    }
  } catch (error) {
    console.error('Error ending call:', error);
    next(error);
  }
}

/**
 * Get the active call for the current user
 * GET /api/v1/calls/active
 */
export async function getActiveCallController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    const call = await getActiveCallForUser(userId);
    if (!call) {
      return res.status(404).json({ message: 'No active call found' });
    }

    // Determine partner user ID
    const partnerId = call.initiator_user_id === userId ? call.receiver_user_id : call.initiator_user_id;
    
    // Check if either user has blocked the other or if there's a report between them
    const [blockExists, reportExists] = await Promise.all([
      isBlocked(userId, partnerId),
      hasReportBetweenUsers(userId, partnerId)
    ]);
    
    if (blockExists) {
      return res.status(403).json({ 
        success: false,
        message: 'Forbidden: This call is unavailable due to a block between users' 
      });
    }
    
    if (reportExists) {
      return res.status(403).json({ 
        success: false,
        message: 'Forbidden: This call is unavailable due to a report between users' 
      });
    }
    
    // Check if partner is online
    const isPartnerOnline = await isUserOnline(partnerId);

    // Normalize BigInt values before sending as JSON
    const normalizedCall = normalizeBigInts(call);
    
    // Ensure initiator and receiver user status_message is exposed
    // First create a copy to avoid modifying the normalized object directly
    const formattedCall = {
      ...normalizedCall,
      initiator_user: {
        ...normalizedCall.initiator_user,
        status_message: normalizedCall.initiator_user.status_message || "" 
      },
      receiver_user: {
        ...normalizedCall.receiver_user,
        status_message: normalizedCall.receiver_user.status_message || ""
      },
      is_partner_online: isPartnerOnline
    };
    
    return res.status(200).json({
      success: true,
      call: formattedCall
    });
  } catch (error) {
    console.error('Error fetching active call:', error);
    next(error);
  }
}

/**
 * Start a new call between users in an active match
 * POST /api/v1/calls/start/:matchId
 */
export async function startCallController(req: Request, res: Response, next: NextFunction) {
  try {
    // Get the initiator user ID from the token
    const initiatorUserId = req.user?.userId;
    if (!initiatorUserId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    // Get the match ID from URL parameters
    const matchId = parseInt(req.params.matchId, 10);
    if (isNaN(matchId)) {
      return res.status(400).json({ message: 'Invalid match ID format' });
    }

    // Validate request body
    const validationResult = startCallSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: 'Invalid request body',
        errors: validationResult.error.errors
      });
    }

    // Get match details to determine the receiver user ID
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      select: { 
        user1_id: true, 
        user2_id: true 
      }
    });
    
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    
    // Determine the receiver user ID
    const receiverUserId = match.user1_id === initiatorUserId ? match.user2_id : match.user1_id;
    
    // Check if either user has blocked the other or if there's a report between them
    const [blockExists, reportExists] = await Promise.all([
      isBlocked(initiatorUserId, receiverUserId),
      hasReportBetweenUsers(initiatorUserId, receiverUserId)
    ]);
    
    if (blockExists) {
      return res.status(403).json({ 
        success: false,
        message: 'Forbidden: You cannot start a call with a user that has been blocked' 
      });
    }
    
    if (reportExists) {
      return res.status(403).json({ 
        success: false,
        message: 'Forbidden: You cannot start a call with a user involved in a report' 
      });
    }

    // Start the call
    try {
      const call = await startCall(initiatorUserId, matchId, validationResult.data.callType);
      
      // Normalize BigInt values before sending as JSON
      const normalizedCall = normalizeBigInts(call);
      
      return res.status(201).json({
        success: true,
        call: normalizedCall
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Active match not found') {
          return res.status(404).json({ message: 'Active match not found' });
        } else if (error.message === 'User not part of this match') {
          return res.status(403).json({ message: 'Unauthorized: You are not part of this match' });
        } else if (error.message === 'Invalid call type. Must be "voice" or "video"') {
          return res.status(400).json({ message: error.message });
        }
      }
      throw error; // Re-throw for the outer catch
    }
  } catch (error) {
    console.error('Error starting call:', error);
    next(error);
  }
}

/**
 * Get a chain of call segments for a specific match
 * GET /api/v1/calls/chain/:matchId
 */
export async function getCallChainController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    const matchId = parseInt(req.params.matchId, 10);
    if (isNaN(matchId)) {
      return res.status(400).json({ message: 'Invalid match ID format' });
    }

    try {
      // Get the match to check for blocks/reports
      const match = await prisma.match.findUnique({
        where: { id: matchId },
        select: {
          user1_id: true,
          user2_id: true,
        }
      });

      if (!match) {
        return res.status(404).json({ 
          success: false,
          message: 'Match not found' 
        });
      }

      // Determine the partner user ID
      const partnerId = match.user1_id === userId ? match.user2_id : match.user1_id;

      // Check if either user has blocked the other or if there's a report between them
      const [blockExists, reportExists] = await Promise.all([
        isBlocked(userId, partnerId),
        hasReportBetweenUsers(userId, partnerId)
      ]);

      if (blockExists) {
        return res.status(403).json({ 
          success: false,
          message: 'Forbidden: Cannot access call history due to a block between users' 
        });
      }

      if (reportExists) {
        return res.status(403).json({ 
          success: false,
          message: 'Forbidden: Cannot access call history due to a report between users' 
        });
      }

      // Get the call chain
      const callChain = await getCallChainForMatch(matchId, userId);

      // Normalize any BigInt values in the response
      const normalizedCallChain = normalizeBigInts(callChain);

      return res.status(200).json({
        success: true,
        data: normalizedCallChain
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Match not found') {
          return res.status(404).json({ 
            success: false,
            message: 'Match not found' 
          });
        } else if (error.message === 'User not part of this match') {
          return res.status(403).json({ 
            success: false,
            message: 'Unauthorized: You are not part of this match' 
          });
        }
      }
      throw error; // Re-throw for the outer catch
    }
  } catch (error) {
    console.error('Error fetching call chain:', error);
    next(error);
  }
} 