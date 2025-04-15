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