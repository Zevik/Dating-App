import { Request, Response, NextFunction } from 'express';
import { startCall } from '../services/callService';
import { z } from 'zod';

// Schema for validating request body
const startCallSchema = z.object({
  type: z.enum(['voice', 'video']),
});

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
    let validatedData;
    try {
      validatedData = startCallSchema.parse(req.body);
    } catch (validationError) {
      return res.status(400).json({ 
        message: 'Invalid request data', 
        details: validationError instanceof z.ZodError ? validationError.errors : 'Validation failed' 
      });
    }

    // Start the call
    try {
      const call = await startCall(initiatorUserId, matchId, validatedData.type);
      
      return res.status(201).json({
        success: true,
        call
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