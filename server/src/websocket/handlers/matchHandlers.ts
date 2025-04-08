import { Server, Socket } from 'socket.io';
import { prisma } from '../../index';
import { logger } from '../../utils/logger';
import { redis } from '../../utils/redis';
import { sendToUser } from '../index';

/**
 * Setup match-related WebSocket event handlers
 */
export const setupMatchHandlers = (io: Server, socket: Socket): void => {
  const userId = socket.data.user?.id;
  
  if (!userId) {
    return;
  }
  
  /**
   * Handle match:accept event
   * When user accepts a match
   */
  socket.on('match:accept', async (data: { matchId: string }) => {
    try {
      const { matchId } = data;
      
      // Validate matchId
      if (!matchId) {
        socket.emit('error', {
          code: 'INVALID_PARAMS',
          message: 'Match ID is required',
        });
        return;
      }
      
      // Find match in database
      const match = await prisma.match.findUnique({
        where: { id: matchId },
        include: {
          user1: { select: { id: true, firstName: true } },
          user2: { select: { id: true, firstName: true } },
        },
      });
      
      if (!match) {
        socket.emit('error', {
          code: 'NOT_FOUND',
          message: 'Match not found',
        });
        return;
      }
      
      // Check if user is part of the match
      if (match.user1Id !== userId && match.user2Id !== userId) {
        socket.emit('error', {
          code: 'FORBIDDEN',
          message: 'You are not part of this match',
        });
        return;
      }
      
      // If match is already active, do nothing
      if (match.status === 'ACTIVE') {
        return;
      }
      
      // Update match status
      await prisma.match.update({
        where: { id: matchId },
        data: { status: 'ACTIVE' },
      });
      
      // Get the other user in the match
      const otherUserId = match.user1Id === userId ? match.user2Id : match.user1Id;
      const otherUserName = match.user1Id === userId ? match.user2.firstName : match.user1.firstName;
      const currentUserName = match.user1Id === userId ? match.user1.firstName : match.user2.firstName;
      
      // Notify both users
      socket.emit('match:accepted', {
        matchId,
        user: {
          id: otherUserId,
          firstName: otherUserName,
        },
      });
      
      await sendToUser(io, otherUserId, 'match:accepted', {
        matchId,
        user: {
          id: userId,
          firstName: currentUserName,
        },
      });
      
      logger.info(`Match ${matchId} accepted by user ${userId}`);
    } catch (error) {
      logger.error('Error in match:accept handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
  
  /**
   * Handle match:decline event
   * When user declines a match
   */
  socket.on('match:decline', async (data: { matchId: string }) => {
    try {
      const { matchId } = data;
      
      // Validate matchId
      if (!matchId) {
        socket.emit('error', {
          code: 'INVALID_PARAMS',
          message: 'Match ID is required',
        });
        return;
      }
      
      // Find match in database
      const match = await prisma.match.findUnique({
        where: { id: matchId },
        include: {
          user1: { select: { id: true, firstName: true } },
          user2: { select: { id: true, firstName: true } },
        },
      });
      
      if (!match) {
        socket.emit('error', {
          code: 'NOT_FOUND',
          message: 'Match not found',
        });
        return;
      }
      
      // Check if user is part of the match
      if (match.user1Id !== userId && match.user2Id !== userId) {
        socket.emit('error', {
          code: 'FORBIDDEN',
          message: 'You are not part of this match',
        });
        return;
      }
      
      // Update match status
      await prisma.match.update({
        where: { id: matchId },
        data: {
          status: 'ENDED',
          endedAt: new Date(),
        },
      });
      
      // Get the other user in the match
      const otherUserId = match.user1Id === userId ? match.user2Id : match.user1Id;
      
      // Notify both users
      socket.emit('match:declined', { matchId });
      
      await sendToUser(io, otherUserId, 'match:declined', {
        matchId,
        userId,
      });
      
      logger.info(`Match ${matchId} declined by user ${userId}`);
    } catch (error) {
      logger.error('Error in match:decline handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
  
  /**
   * Handle match:end event
   * When user ends a match
   */
  socket.on('match:end', async (data: { matchId: string }) => {
    try {
      const { matchId } = data;
      
      // Validate matchId
      if (!matchId) {
        socket.emit('error', {
          code: 'INVALID_PARAMS',
          message: 'Match ID is required',
        });
        return;
      }
      
      // Find match in database
      const match = await prisma.match.findUnique({
        where: { id: matchId },
        include: {
          user1: { select: { id: true, firstName: true } },
          user2: { select: { id: true, firstName: true } },
        },
      });
      
      if (!match) {
        socket.emit('error', {
          code: 'NOT_FOUND',
          message: 'Match not found',
        });
        return;
      }
      
      // Check if user is part of the match
      if (match.user1Id !== userId && match.user2Id !== userId) {
        socket.emit('error', {
          code: 'FORBIDDEN',
          message: 'You are not part of this match',
        });
        return;
      }
      
      // If match is already ended, do nothing
      if (match.status !== 'ACTIVE') {
        return;
      }
      
      // Update match status
      await prisma.match.update({
        where: { id: matchId },
        data: {
          status: 'ENDED',
          endedAt: new Date(),
        },
      });
      
      // Get the other user in the match
      const otherUserId = match.user1Id === userId ? match.user2Id : match.user1Id;
      
      // Notify both users
      socket.emit('match:ended', { matchId });
      
      await sendToUser(io, otherUserId, 'match:ended', {
        matchId,
        userId,
      });
      
      logger.info(`Match ${matchId} ended by user ${userId}`);
    } catch (error) {
      logger.error('Error in match:end handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
}; 