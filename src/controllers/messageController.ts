import { Request, Response, NextFunction } from 'express';
import { createMessage, getMessagesForMatch, markMessagesAsRead, getUnreadMessageCount } from '../services/messageService';
import { createMessageSchema, updateReadStatusSchema } from '../validations/messageSchemas';
import { parsePaginationParams } from '../utils/paginationUtils';

/**
 * Send a new message in a match
 * POST /api/v1/messages/:matchId
 */
export async function sendMessageController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    const matchId = parseInt(req.params.matchId, 10);
    if (isNaN(matchId)) {
      return res.status(400).json({ message: 'Invalid match ID format' });
    }

    // Validate request body
    const validationResult = createMessageSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationResult.error.errors
      });
    }

    // Create message
    const message = await createMessage(matchId, userId, validationResult.data.content);

    return res.status(201).json({
      success: true,
      message
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get messages for a match
 * GET /api/v1/messages/:matchId
 */
export async function getMessagesController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    const matchId = parseInt(req.params.matchId, 10);
    if (isNaN(matchId)) {
      return res.status(400).json({ message: 'Invalid match ID format' });
    }

    // Parse pagination parameters
    const pagination = parsePaginationParams(req.query);

    // Get messages
    const result = await getMessagesForMatch(matchId, userId, pagination);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

/**
 * Mark messages as read
 * PATCH /api/v1/messages/read
 */
export async function markMessagesReadController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    // Validate request body
    const validationResult = updateReadStatusSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationResult.error.errors
      });
    }

    // Mark messages as read
    const result = await markMessagesAsRead(validationResult.data.message_ids, userId);

    return res.status(200).json({
      success: true,
      updated_count: result.count
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get count of unread messages for current user
 * GET /api/v1/messages/unread/count
 */
export async function getUnreadCountController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    const result = await getUnreadMessageCount(userId);

    return res.status(200).json({
      unread_count: result.count
    });
  } catch (error) {
    next(error);
  }
} 