import prisma from '../lib/prisma';

/**
 * Start a new call between users in an active match
 * @param initiatorUserId The ID of the user starting the call
 * @param matchId The ID of the match where the call is being started
 * @param callType The type of call ('voice' or 'video')
 * @returns The newly created call record
 * @throws Error if any validation fails
 */
export async function startCall(initiatorUserId: number, matchId: number, callType: string) {
  // Validate call type
  if (callType !== 'voice' && callType !== 'video') {
    throw new Error('Invalid call type. Must be "voice" or "video"');
  }

  // Find the match and validate it exists and is active
  const match = await prisma.match.findUnique({
    where: {
      id: matchId,
      is_active: true,
    },
  });

  if (!match) {
    throw new Error('Active match not found');
  }

  // Verify the initiator is part of the match
  if (match.user1_id !== initiatorUserId && match.user2_id !== initiatorUserId) {
    throw new Error('User not part of this match');
  }

  // Determine the receiver user ID (the other user in the match)
  const receiverUserId = match.user1_id === initiatorUserId ? match.user2_id : match.user1_id;

  // Create a new call record
  const call = await prisma.call.create({
    data: {
      match_id: matchId,
      initiator_user_id: initiatorUserId,
      receiver_user_id: receiverUserId,
      call_type: callType,
      status: 'initiated',
      initiated_at: new Date(),
    },
    include: {
      match: true,
      initiator_user: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true,
        },
      },
      receiver_user: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true,
        },
      },
    },
  });

  // Update the match's last_interaction_at
  await prisma.match.update({
    where: { id: matchId },
    data: { last_interaction_at: new Date() },
  });

  return call;
}

/**
 * Get call history for a user
 * @param userId The ID of the user to get history for
 * @returns Array of calls the user has initiated or received
 */
export async function getCallHistoryForUser(userId: number) {
  return prisma.call.findMany({
    where: {
      OR: [
        { initiator_user_id: userId },
        { receiver_user_id: userId }
      ]
    },
    orderBy: {
      initiated_at: 'desc',
    },
    include: {
      match: {
        select: {
          id: true,
          matched_at: true,
        }
      },
      initiator_user: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true,
        }
      },
      receiver_user: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true,
        }
      }
    }
  });
} 