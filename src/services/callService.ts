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

  // Find the latest call for this match to link them
  const latestCall = await prisma.call.findFirst({
    where: {
      match_id: matchId,
    },
    orderBy: {
      initiated_at: 'desc',
    },
    select: {
      call_segment_uuid: true,
    },
  });

  // Create a new call record
  const call = await prisma.call.create({
    data: {
      match_id: matchId,
      initiator_user_id: initiatorUserId,
      receiver_user_id: receiverUserId,
      call_type: callType,
      status: 'initiated',
      initiated_at: new Date(),
      previous_call_segment_uuid: latestCall?.call_segment_uuid,
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

/**
 * End an existing call
 * @param callId The ID of the call to end
 * @param userId The ID of the user ending the call
 * @returns The updated call record
 * @throws Error if call not found, user not part of call, or call already ended
 */
export async function endCall(callId: bigint | number, userId: number) {
  // Find the call and validate it exists
  const call = await prisma.call.findUnique({
    where: { id: BigInt(callId) }
  });

  if (!call) {
    throw new Error('Call not found');
  }

  // Verify the user is part of the call
  if (call.initiator_user_id !== userId && call.receiver_user_id !== userId) {
    throw new Error('User not part of this call');
  }

  // Check if the call is already ended
  if (call.status === 'ended') {
    throw new Error('Call is already ended');
  }

  // Calculate duration if needed
  let durationSeconds = null;
  if (call.start_time) {
    const endTime = new Date();
    const startTime = call.start_time;
    durationSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
  }

  // Determine end reason based on who ended the call
  const endReason = call.initiator_user_id === userId ? 'initiator_ended' : 'receiver_ended';

  // Update the call
  const updatedCall = await prisma.call.update({
    where: { id: BigInt(callId) },
    data: {
      status: 'ended',
      end_time: new Date(),
      duration_seconds: durationSeconds,
      end_reason: endReason
    },
    include: {
      match: true,
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

  // Update the match's last_interaction_at
  await prisma.match.update({
    where: { id: updatedCall.match_id },
    data: { last_interaction_at: new Date() },
  });

  return updatedCall;
}

/**
 * Get the active call for a user
 * @param userId The ID of the user to get active call for
 * @returns The active call the user is currently in, or null if no active call
 * @returns Call object including previous_call_segment_uuid for call chaining
 */
export async function getActiveCallForUser(userId: number) {
  // This query returns all Call fields including previous_call_segment_uuid
  return prisma.call.findFirst({
    where: {
      status: 'initiated',
      OR: [
        { initiator_user_id: userId },
        { receiver_user_id: userId }
      ]
    },
    include: {
      match: true,
      initiator_user: {
        select: { id: true, display_name: true, profile_image_url: true }
      },
      receiver_user: {
        select: { id: true, display_name: true, profile_image_url: true }
      }
    }
  });
} 