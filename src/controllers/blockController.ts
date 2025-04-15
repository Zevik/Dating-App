import { Request, Response } from 'express';
import { blockUser, getBlockedUsers, unblockUser } from '../services/blockService';
import { BadRequestError, NotFoundError } from '../errors/AppError';

/**
 * Block a user
 * @route POST /api/v1/blocks/:userId
 */
export async function blockUserController(req: Request, res: Response) {
  const currentUserId = req.user?.userId;
  
  if (!currentUserId) {
    return res.status(401).json({ message: 'Unauthorized: User ID not found in token payload' });
  }
  
  const blockedUserId = parseInt(req.params.userId);
  
  if (isNaN(blockedUserId)) {
    throw new BadRequestError('Invalid user ID');
  }
  
  await blockUser(currentUserId, blockedUserId);
  
  res.status(200).json({
    success: true,
    message: 'User blocked successfully'
  });
}

/**
 * Unblock a user
 * @route DELETE /api/v1/blocks/:userId
 */
export async function unblockUserController(req: Request, res: Response) {
  const currentUserId = req.user?.userId;
  
  if (!currentUserId) {
    return res.status(401).json({ message: 'Unauthorized: User ID not found in token payload' });
  }
  
  const blockedUserId = parseInt(req.params.userId);
  
  if (isNaN(blockedUserId)) {
    throw new BadRequestError('Invalid user ID');
  }
  
  try {
    await unblockUser(currentUserId, blockedUserId);
    
    res.status(200).json({
      success: true,
      message: 'User unblocked successfully'
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    throw error; // Let the global error handler handle other errors
  }
}

/**
 * Get all blocked users
 * @route GET /api/v1/blocks
 */
export async function getBlockedUsersController(req: Request, res: Response) {
  const currentUserId = req.user?.userId;
  
  if (!currentUserId) {
    return res.status(401).json({ message: 'Unauthorized: User ID not found in token payload' });
  }
  
  const blockedUsers = await getBlockedUsers(currentUserId);
  
  res.status(200).json({
    success: true,
    data: blockedUsers
  });
} 