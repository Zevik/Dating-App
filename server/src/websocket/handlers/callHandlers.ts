import { Server, Socket } from 'socket.io';
import { prisma } from '../../index';
import { logger } from '../../utils/logger';
import { redis } from '../../utils/redis';
import { sendToUser } from '../index';

/**
 * Setup call-related WebSocket event handlers
 */
export const setupCallHandlers = (io: Server, socket: Socket): void => {
  const userId = socket.data.user?.id;
  
  if (!userId) {
    return;
  }
  
  /**
   * Handle call:ice_candidate event
   * Forward ICE candidates during WebRTC negotiation
   */
  socket.on('call:ice_candidate', async (data: { 
    callId: string;
    candidate: RTCIceCandidateInit;
  }) => {
    try {
      const { callId, candidate } = data;
      
      if (!callId || !candidate) {
        socket.emit('error', {
          code: 'INVALID_PARAMS',
          message: 'Call ID and candidate are required',
        });
        return;
      }
      
      // Find call in database
      const call = await prisma.call.findUnique({
        where: { id: callId },
        select: {
          initiatorId: true,
          receiverId: true,
          status: true,
        },
      });
      
      if (!call) {
        socket.emit('error', {
          code: 'NOT_FOUND',
          message: 'Call not found',
        });
        return;
      }
      
      // Check if user is part of the call
      if (call.initiatorId !== userId && call.receiverId !== userId) {
        socket.emit('error', {
          code: 'FORBIDDEN',
          message: 'You are not part of this call',
        });
        return;
      }
      
      // Get the other user in the call
      const otherUserId = call.initiatorId === userId 
        ? call.receiverId 
        : call.initiatorId;
      
      // Forward the ICE candidate to the other user
      await sendToUser(io, otherUserId, 'call:ice_candidate', {
        callId,
        candidate,
        from: userId,
      });
      
      logger.debug(`ICE candidate forwarded from ${userId} to ${otherUserId} for call ${callId}`);
    } catch (error) {
      logger.error('Error in call:ice_candidate handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
  
  /**
   * Handle call:sdp_offer event
   * Forward SDP offer during WebRTC negotiation
   */
  socket.on('call:sdp_offer', async (data: { 
    callId: string;
    sdp: RTCSessionDescriptionInit;
  }) => {
    try {
      const { callId, sdp } = data;
      
      if (!callId || !sdp) {
        socket.emit('error', {
          code: 'INVALID_PARAMS',
          message: 'Call ID and SDP are required',
        });
        return;
      }
      
      // Find call in database
      const call = await prisma.call.findUnique({
        where: { id: callId },
        select: {
          initiatorId: true,
          receiverId: true,
          status: true,
        },
      });
      
      if (!call) {
        socket.emit('error', {
          code: 'NOT_FOUND',
          message: 'Call not found',
        });
        return;
      }
      
      // Check if user is part of the call
      if (call.initiatorId !== userId && call.receiverId !== userId) {
        socket.emit('error', {
          code: 'FORBIDDEN',
          message: 'You are not part of this call',
        });
        return;
      }
      
      // Get the other user in the call
      const otherUserId = call.initiatorId === userId 
        ? call.receiverId 
        : call.initiatorId;
      
      // Forward the SDP offer to the other user
      await sendToUser(io, otherUserId, 'call:sdp_offer', {
        callId,
        sdp,
        from: userId,
      });
      
      logger.debug(`SDP offer forwarded from ${userId} to ${otherUserId} for call ${callId}`);
    } catch (error) {
      logger.error('Error in call:sdp_offer handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
  
  /**
   * Handle call:sdp_answer event
   * Forward SDP answer during WebRTC negotiation
   */
  socket.on('call:sdp_answer', async (data: { 
    callId: string;
    sdp: RTCSessionDescriptionInit;
  }) => {
    try {
      const { callId, sdp } = data;
      
      if (!callId || !sdp) {
        socket.emit('error', {
          code: 'INVALID_PARAMS',
          message: 'Call ID and SDP are required',
        });
        return;
      }
      
      // Find call in database
      const call = await prisma.call.findUnique({
        where: { id: callId },
        select: {
          initiatorId: true,
          receiverId: true,
          status: true,
        },
      });
      
      if (!call) {
        socket.emit('error', {
          code: 'NOT_FOUND',
          message: 'Call not found',
        });
        return;
      }
      
      // Check if user is part of the call
      if (call.initiatorId !== userId && call.receiverId !== userId) {
        socket.emit('error', {
          code: 'FORBIDDEN',
          message: 'You are not part of this call',
        });
        return;
      }
      
      // Get the other user in the call
      const otherUserId = call.initiatorId === userId 
        ? call.receiverId 
        : call.initiatorId;
      
      // Forward the SDP answer to the other user
      await sendToUser(io, otherUserId, 'call:sdp_answer', {
        callId,
        sdp,
        from: userId,
      });
      
      logger.debug(`SDP answer forwarded from ${userId} to ${otherUserId} for call ${callId}`);
    } catch (error) {
      logger.error('Error in call:sdp_answer handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
  
  /**
   * Handle call:end event
   * End an ongoing call
   */
  socket.on('call:end', async (data: { callId: string }) => {
    try {
      const { callId } = data;
      
      if (!callId) {
        socket.emit('error', {
          code: 'INVALID_PARAMS',
          message: 'Call ID is required',
        });
        return;
      }
      
      // Find call in database
      const call = await prisma.call.findUnique({
        where: { id: callId },
        select: {
          initiatorId: true,
          receiverId: true,
          status: true,
          startTime: true,
        },
      });
      
      if (!call) {
        socket.emit('error', {
          code: 'NOT_FOUND',
          message: 'Call not found',
        });
        return;
      }
      
      // Check if user is part of the call
      if (call.initiatorId !== userId && call.receiverId !== userId) {
        socket.emit('error', {
          code: 'FORBIDDEN',
          message: 'You are not part of this call',
        });
        return;
      }
      
      // If call is not in progress, do nothing
      if (call.status !== 'PENDING' && call.status !== 'ACCEPTED') {
        return;
      }
      
      const now = new Date();
      let duration = null;
      
      // Calculate call duration if call was started
      if (call.startTime && call.status === 'ACCEPTED') {
        duration = Math.floor((now.getTime() - call.startTime.getTime()) / 1000);
      }
      
      // Update call status
      await prisma.call.update({
        where: { id: callId },
        data: {
          status: 'COMPLETED',
          endTime: now,
          duration,
        },
      });
      
      // Get the other user in the call
      const otherUserId = call.initiatorId === userId 
        ? call.receiverId 
        : call.initiatorId;
      
      // Clear active call from Redis
      await redis.del(`user:${userId}:activeCall`);
      await redis.del(`user:${otherUserId}:activeCall`);
      
      // Notify both users
      socket.emit('call:ended', { 
        callId,
        duration,
        endedBy: userId,
      });
      
      await sendToUser(io, otherUserId, 'call:ended', {
        callId,
        duration,
        endedBy: userId,
      });
      
      logger.info(`Call ${callId} ended by user ${userId} with duration ${duration} seconds`);
    } catch (error) {
      logger.error('Error in call:end handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
  
  /**
   * Handle call:extend_request event
   * Request to extend an ongoing call
   */
  socket.on('call:extend_request', async (data: { callId: string }) => {
    try {
      const { callId } = data;
      
      if (!callId) {
        socket.emit('error', {
          code: 'INVALID_PARAMS',
          message: 'Call ID is required',
        });
        return;
      }
      
      // Find call in database
      const call = await prisma.call.findUnique({
        where: { id: callId },
        select: {
          initiatorId: true,
          receiverId: true,
          status: true,
        },
      });
      
      if (!call) {
        socket.emit('error', {
          code: 'NOT_FOUND',
          message: 'Call not found',
        });
        return;
      }
      
      // Check if user is part of the call
      if (call.initiatorId !== userId && call.receiverId !== userId) {
        socket.emit('error', {
          code: 'FORBIDDEN',
          message: 'You are not part of this call',
        });
        return;
      }
      
      // If call is not in progress, do nothing
      if (call.status !== 'ACCEPTED') {
        socket.emit('error', {
          code: 'INVALID_STATE',
          message: 'Call is not in progress',
        });
        return;
      }
      
      // Get the other user in the call
      const otherUserId = call.initiatorId === userId 
        ? call.receiverId 
        : call.initiatorId;
      
      // Notify the other user
      await sendToUser(io, otherUserId, 'call:extend_requested', {
        callId,
        userId,
      });
      
      logger.info(`Call extension requested by user ${userId} for call ${callId}`);
    } catch (error) {
      logger.error('Error in call:extend_request handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
  
  /**
   * Handle call:upgrade_request event
   * Request to upgrade a call (e.g., audio to video)
   */
  socket.on('call:upgrade_request', async (data: { callId: string }) => {
    try {
      const { callId } = data;
      
      if (!callId) {
        socket.emit('error', {
          code: 'INVALID_PARAMS',
          message: 'Call ID is required',
        });
        return;
      }
      
      // Find call in database
      const call = await prisma.call.findUnique({
        where: { id: callId },
        select: {
          initiatorId: true,
          receiverId: true,
          status: true,
          isAudioOnly: true,
        },
      });
      
      if (!call) {
        socket.emit('error', {
          code: 'NOT_FOUND',
          message: 'Call not found',
        });
        return;
      }
      
      // Check if user is part of the call
      if (call.initiatorId !== userId && call.receiverId !== userId) {
        socket.emit('error', {
          code: 'FORBIDDEN',
          message: 'You are not part of this call',
        });
        return;
      }
      
      // If call is not in progress or already has video, do nothing
      if (call.status !== 'ACCEPTED' || !call.isAudioOnly) {
        socket.emit('error', {
          code: 'INVALID_STATE',
          message: 'Call cannot be upgraded',
        });
        return;
      }
      
      // Get the other user in the call
      const otherUserId = call.initiatorId === userId 
        ? call.receiverId 
        : call.initiatorId;
      
      // Notify the other user
      await sendToUser(io, otherUserId, 'call:upgrade_requested', {
        callId,
        userId,
      });
      
      logger.info(`Call upgrade requested by user ${userId} for call ${callId}`);
    } catch (error) {
      logger.error('Error in call:upgrade_request handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
}; 