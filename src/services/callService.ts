import prisma from '../lib/prisma';
import { PaginationParams, PaginatedResult } from '../utils/paginationUtils';

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
          status_message: true,
        },
      },
      receiver_user: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true,
          status_message: true,
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
 * Get call history for a user with pagination
 * @param userId The ID of the user to get history for
 * @param pagination The pagination parameters (page, limit)
 * @returns Paginated result of calls the user has initiated or received
 */
export async function getCallHistoryForUser(
  userId: number, 
  pagination?: PaginationParams
): Promise<PaginatedResult<any>> {
  const { page = 1, limit = 10 } = pagination || {};
  const skip = (page - 1) * limit;

  // Query conditions
  const where = {
    OR: [
      { initiator_user_id: userId },
      { receiver_user_id: userId }
    ]
  };

  // Execute count query and data query in parallel
  const [totalCount, calls] = await Promise.all([
    // Count total matching records
    prisma.call.count({ where }),
    
    // Get paginated data
    prisma.call.findMany({
      where,
      orderBy: {
        initiated_at: 'desc',
      },
      skip,
      take: limit,
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
            status_message: true,
          }
        },
        receiver_user: {
          select: {
            id: true,
            display_name: true,
            profile_image_url: true,
            status_message: true,
          }
        }
      }
    })
  ]);

  // Return paginated result
  return {
    totalCount,
    page,
    limit,
    data: calls
  };
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
          status_message: true,
        }
      },
      receiver_user: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true,
          status_message: true,
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
        select: { 
          id: true, 
          display_name: true, 
          profile_image_url: true,
          status_message: true 
        }
      },
      receiver_user: {
        select: { 
          id: true, 
          display_name: true, 
          profile_image_url: true,
          status_message: true 
        }
      }
    }
  });
}

/**
 * Get a chain of call segments for a specific match
 * @param matchId The ID of the match to get call chain for
 * @param userId The ID of the user making the request (for authorization checking)
 * @returns Array of calls sorted from newest to oldest, linked by previous_call_segment_uuid
 */
export async function getCallChainForMatch(matchId: number, userId: number) {
  // First ensure the match exists and the user is part of it
  const match = await prisma.match.findUnique({
    where: { id: matchId },
    select: {
      user1_id: true,
      user2_id: true,
    }
  });

  if (!match) {
    throw new Error('Match not found');
  }

  // Verify user is part of this match
  if (match.user1_id !== userId && match.user2_id !== userId) {
    throw new Error('User not part of this match');
  }

  // Get all calls for this match, ordered by initiated_at desc
  const calls = await prisma.call.findMany({
    where: { match_id: matchId },
    orderBy: { initiated_at: 'desc' },
    include: {
      initiator_user: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true,
          status_message: true,
        }
      },
      receiver_user: {
        select: {
          id: true,
          display_name: true,
          profile_image_url: true,
          status_message: true,
        }
      }
    }
  });
  
  // Process the calls to organize them in chronological order
  // This creates a clear chain showing how calls are linked
  const callChain = [];
  const callMap = new Map();
  
  // First, create a map of all calls keyed by their UUID
  for (const call of calls) {
    callMap.set(call.call_segment_uuid, call);
  }
  
  // Find the most recent call (should be the first one due to orderBy desc)
  let currentCall = calls.length > 0 ? calls[0] : null;
  
  // Build the chain from newest to oldest
  while (currentCall) {
    callChain.push(currentCall);
    
    // If this call has a previous segment, add it next
    if (currentCall.previous_call_segment_uuid) {
      currentCall = callMap.get(currentCall.previous_call_segment_uuid) || null;
    } else {
      currentCall = null; // No more previous calls
    }
  }
  
  return callChain;
} 