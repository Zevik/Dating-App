import prisma from '../lib/prisma';
import { ForbiddenError, NotFoundError } from '../errors/AppError';
import { PaginationParams } from '../utils/paginationUtils';

/**
 * Create a new message in a match
 * @param matchId ID of the match where the message is being sent
 * @param senderId ID of the user sending the message
 * @param content Content of the message
 * @returns The created message
 * @throws NotFoundError if match not found
 * @throws ForbiddenError if user not part of the match or match is inactive
 */
export async function createMessage(matchId: number, senderId: number, content: string) {
  // Get the match to verify it exists and user is part of it
  const match = await prisma.match.findUnique({
    where: { id: matchId }
  });

  if (!match) {
    throw new NotFoundError('Match not found');
  }

  // Check if the sender is part of the match
  if (match.user1_id !== senderId && match.user2_id !== senderId) {
    throw new ForbiddenError('User is not part of this match');
  }

  // Check if the match is active
  if (!match.is_active) {
    throw new ForbiddenError('Cannot send message in an inactive match');
  }

  // Create the message
  const message = await prisma.message.create({
    data: {
      match_id: matchId,
      sender_id: senderId,
      content,
    }
  });

  // Update the match's last interaction time
  await prisma.match.update({
    where: { id: matchId },
    data: { last_interaction_at: new Date() }
  });

  return message;
}

/**
 * Get messages for a specific match
 * @param matchId ID of the match to get messages for
 * @param userId ID of the user requesting the messages (for authorization)
 * @param pagination Pagination parameters
 * @returns List of messages
 * @throws NotFoundError if match not found
 * @throws ForbiddenError if user not part of the match
 */
export async function getMessagesForMatch(
  matchId: number, 
  userId: number,
  pagination?: PaginationParams
): Promise<{ messages: any[] }> {
  const { page = 1, limit = 20 } = pagination || {};
  const skip = (page - 1) * limit;

  // Get the match to verify it exists and user is part of it
  const match = await prisma.match.findUnique({
    where: { id: matchId }
  });

  if (!match) {
    throw new NotFoundError('Match not found');
  }

  // Check if the user is part of the match
  if (match.user1_id !== userId && match.user2_id !== userId) {
    throw new ForbiddenError('User is not part of this match');
  }

  // Get messages with pagination
  const messages = await prisma.message.findMany({
    where: { match_id: matchId },
    orderBy: { created_at: 'desc' },
    skip,
    take: limit,
    include: {
      sender: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true
        }
      }
    }
  });

  return {
    messages
  };
}

/**
 * Mark specified messages as read
 * @param messageIds Array of message IDs to mark as read
 * @param userId ID of the user marking messages as read
 * @returns Count of updated messages
 * @throws ForbiddenError if user is not the recipient of any message
 */
export async function markMessagesAsRead(messageIds: number[], userId: number) {
  if (!messageIds.length) {
    return { count: 0 };
  }

  // First check if all messages are in matches that the user is part of
  const messages = await prisma.message.findMany({
    where: { id: { in: messageIds } },
    include: { match: true }
  });

  // Filter messages to those that the user did not send (can only mark received messages as read)
  const receivedMessageIds = messages
    .filter(msg => msg.sender_id !== userId &&
            (msg.match.user1_id === userId || msg.match.user2_id === userId))
    .map(msg => msg.id);

  if (!receivedMessageIds.length) {
    return { count: 0 };
  }

  // Update messages to mark as read
  const result = await prisma.message.updateMany({
    where: { 
      id: { in: receivedMessageIds },
      is_read: false
    },
    data: { 
      is_read: true,
      read_at: new Date()
    }
  });

  return { count: result.count };
}

/**
 * Get count of unread messages for a user across all matches
 * @param userId ID of the user
 * @returns Count of unread messages
 */
export async function getUnreadMessageCount(userId: number) {
  const count = await prisma.message.count({
    where: {
      is_read: false,
      match: {
        OR: [
          { user1_id: userId },
          { user2_id: userId }
        ]
      },
      sender_id: { not: userId } // Only count messages not sent by the user
    }
  });

  return { count };
} 