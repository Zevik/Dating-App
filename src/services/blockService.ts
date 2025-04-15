import prisma from '../lib/prisma';
import { BadRequestError, NotFoundError, ForbiddenError } from '../errors/AppError';

/**
 * Block a user
 * @param blockerId ID of the user doing the blocking
 * @param blockedId ID of the user being blocked
 * @returns The created block record
 */
export async function blockUser(blockerId: number, blockedId: number) {
  // Validate IDs
  if (!blockerId || !blockedId) {
    throw new BadRequestError('Both blocker and blocked user IDs are required');
  }

  // Prevent self-blocking
  if (blockerId === blockedId) {
    throw new BadRequestError('Users cannot block themselves');
  }

  // Verify both users exist
  const [blocker, blocked] = await Promise.all([
    prisma.user.findUnique({ where: { id: blockerId } }),
    prisma.user.findUnique({ where: { id: blockedId } })
  ]);

  if (!blocker) {
    throw new NotFoundError('Blocker user not found');
  }

  if (!blocked) {
    throw new NotFoundError('User to block not found');
  }

  // Create block record (if already exists, will return existing due to unique constraint)
  return prisma.block.upsert({
    where: {
      blocker_id_blocked_id: {
        blocker_id: blockerId,
        blocked_id: blockedId
      }
    },
    update: {}, // No updates if already exists
    create: {
      blocker_id: blockerId,
      blocked_id: blockedId
    }
  });
}

/**
 * Check if one user has blocked another or vice versa
 * @param userId1 First user ID
 * @param userId2 Second user ID
 * @returns Boolean indicating if either user has blocked the other
 */
export async function isBlocked(userId1: number, userId2: number): Promise<boolean> {
  if (!userId1 || !userId2) {
    return false;
  }

  // Check if either user has blocked the other
  const blockCount = await prisma.block.count({
    where: {
      OR: [
        { blocker_id: userId1, blocked_id: userId2 },
        { blocker_id: userId2, blocked_id: userId1 }
      ]
    }
  });

  return blockCount > 0;
}

/**
 * Get all users blocked by a user
 * @param userId ID of the user whose blocks to retrieve
 * @returns Array of blocked users with basic profile information
 */
export async function getBlockedUsers(userId: number) {
  return prisma.block.findMany({
    where: {
      blocker_id: userId
    },
    select: {
      id: true,
      created_at: true,
      blocked: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true
        }
      }
    }
  });
}

/**
 * Unblock a previously blocked user
 * @param blockerId ID of the user who did the blocking
 * @param blockedId ID of the user who was blocked
 * @throws {NotFoundError} If the block doesn't exist
 * @returns The deleted block record
 */
export async function unblockUser(blockerId: number, blockedId: number) {
  // First check if the block exists
  const existingBlock = await prisma.block.findUnique({
    where: {
      blocker_id_blocked_id: {
        blocker_id: blockerId,
        blocked_id: blockedId
      }
    }
  });

  if (!existingBlock) {
    throw new NotFoundError('Block not found - user was not blocked or already unblocked');
  }

  // Delete the block
  return prisma.block.delete({
    where: {
      blocker_id_blocked_id: {
        blocker_id: blockerId,
        blocked_id: blockedId
      }
    }
  });
} 