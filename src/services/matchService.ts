import prisma from '../lib/prisma';
import { Prisma } from '../generated/prisma';

/**
 * Record a like from one user to another
 * If there's a mutual like, create a match
 */
export async function likeUser(fromUserId: number, toUserId: number) {
  if (fromUserId === toUserId) {
    throw new Error('Users cannot like themselves');
  }

  // Create a like record (or update if it already exists)
  const like = await prisma.like.upsert({
    where: {
      // Using the unique constraint on from_user_id and to_user_id
      from_user_id_to_user_id: {
        from_user_id: fromUserId,
        to_user_id: toUserId,
      },
    },
    update: {
      is_like: true, // Update to like if it was a dislike before
    },
    create: {
      from_user_id: fromUserId,
      to_user_id: toUserId,
      is_like: true,
    },
  });

  // Check if there's a mutual like
  const mutualLike = await prisma.like.findFirst({
    where: {
      from_user_id: toUserId,
      to_user_id: fromUserId,
      is_like: true,
    },
  });

  let match = null;

  // If mutual like exists, create a match if it doesn't already exist
  if (mutualLike) {
    // Sort the user IDs to ensure consistent match creation
    const [user1Id, user2Id] = [fromUserId, toUserId].sort((a, b) => a - b);

    // Check if match already exists
    const existingMatch = await prisma.match.findFirst({
      where: {
        user1_id: user1Id,
        user2_id: user2Id,
      },
    });

    // Create match if it doesn't exist
    if (!existingMatch) {
      match = await prisma.match.create({
        data: {
          user1_id: user1Id,
          user2_id: user2Id,
          matched_at: new Date(),
          is_active: true,
          last_interaction_at: new Date(),
        },
      });
    } else if (!existingMatch.is_active) {
      // If match exists but is inactive, reactivate it
      match = await prisma.match.update({
        where: { id: existingMatch.id },
        data: {
          is_active: true,
          last_interaction_at: new Date(),
          closed_at: null,
          close_reason: null,
        },
      });
    } else {
      // Match already exists and is active
      match = existingMatch;
    }
  }

  return { like, match };
}

/**
 * Record a dislike from one user to another
 */
export async function dislikeUser(fromUserId: number, toUserId: number) {
  if (fromUserId === toUserId) {
    throw new Error('Users cannot dislike themselves');
  }

  // Create a dislike record (or update if it already exists)
  const dislike = await prisma.like.upsert({
    where: {
      // Using the unique constraint on from_user_id and to_user_id
      from_user_id_to_user_id: {
        from_user_id: fromUserId,
        to_user_id: toUserId,
      },
    },
    update: {
      is_like: false, // Update to dislike if it was a like before
    },
    create: {
      from_user_id: fromUserId,
      to_user_id: toUserId,
      is_like: false,
    },
  });

  return { dislike };
}

/**
 * Get the active match for a user
 * @param userId The ID of the user to find an active match for
 * @returns The active match with basic user information or null if none exists
 */
export async function getActiveMatchForUser(userId: number) {
  return prisma.match.findFirst({
    where: {
      is_active: true,
      OR: [
        { user1_id: userId },
        { user2_id: userId },
      ],
    },
    include: {
      user1: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true,
        },
      },
      user2: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true,
        },
      },
    },
  });
}

/**
 * End an active match
 * @param matchId The ID of the match to end
 * @param userId The ID of the user trying to end the match
 * @returns The updated match
 * @throws Error if match not found, user not part of match, or match already inactive
 */
export async function endMatch(matchId: number, userId: number) {
  // Find the match and verify it exists
  const match = await prisma.match.findUnique({
    where: { id: matchId }
  });

  if (!match) {
    throw new Error('Match not found');
  }

  // Verify the user is part of the match
  if (match.user1_id !== userId && match.user2_id !== userId) {
    throw new Error('User not part of this match');
  }

  // Verify the match is active
  if (!match.is_active) {
    throw new Error('Match already inactive');
  }

  // Update the match to be inactive
  return prisma.match.update({
    where: { id: matchId },
    data: {
      is_active: false,
      closed_at: new Date(),
      close_reason: 'user_ended',
    },
    include: {
      user1: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true,
        },
      },
      user2: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true,
        },
      },
    },
  });
} 