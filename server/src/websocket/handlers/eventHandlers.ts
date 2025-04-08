import { Server, Socket } from 'socket.io';
import { prisma } from '../../index';
import { logger } from '../../utils/logger';
import { redis } from '../../utils/redis';

/**
 * Setup general WebSocket event handlers
 */
export const setupEventHandlers = (io: Server, socket: Socket): void => {
  const userId = socket.data.user?.id;
  
  if (!userId) {
    return;
  }
  
  /**
   * Handle error events
   */
  socket.on('error', (error) => {
    logger.error(`Socket error for user ${userId}:`, error);
  });
  
  /**
   * Handle ping/heartbeat
   */
  socket.on('ping', (callback) => {
    if (typeof callback === 'function') {
      callback({ timestamp: Date.now() });
    }
  });
  
  /**
   * Handle user presence
   */
  socket.on('presence:update', async (data: { status: 'online' | 'away' | 'busy' | 'offline' }) => {
    try {
      const { status } = data;
      
      if (!status) {
        socket.emit('error', {
          code: 'INVALID_PARAMS',
          message: 'Status is required',
        });
        return;
      }
      
      // Set presence in Redis with 1 hour expiry
      await redis.set(`user:${userId}:presence`, status, 3600);
      
      // Update last active time in DB
      await prisma.user.update({
        where: { id: userId },
        data: { lastActive: new Date() },
      });
      
      logger.debug(`User ${userId} presence updated to ${status}`);
    } catch (error) {
      logger.error('Error in presence:update handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
  
  /**
   * Handle push notification token registration
   */
  socket.on('push:register', async (data: { token: string, device?: string }) => {
    try {
      const { token, device } = data;
      
      if (!token) {
        socket.emit('error', {
          code: 'INVALID_PARAMS',
          message: 'Token is required',
        });
        return;
      }
      
      // Check if token already exists
      const existingToken = await prisma.pushNotificationToken.findUnique({
        where: { token },
      });
      
      if (existingToken) {
        // Update existing token
        await prisma.pushNotificationToken.update({
          where: { id: existingToken.id },
          data: {
            userId,
            device,
            updatedAt: new Date(),
          },
        });
      } else {
        // Create new token
        await prisma.pushNotificationToken.create({
          data: {
            userId,
            token,
            device,
          },
        });
      }
      
      socket.emit('push:registered', { success: true });
      logger.debug(`Push token registered for user ${userId}`);
    } catch (error) {
      logger.error('Error in push:register handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
  
  /**
   * Handle typing indicators
   */
  socket.on('typing:start', async (data: { matchId: string }) => {
    try {
      const { matchId } = data;
      
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
        select: {
          user1Id: true,
          user2Id: true,
          status: true,
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
      
      // If match is not active, do nothing
      if (match.status !== 'ACTIVE') {
        return;
      }
      
      // Get the other user in the match
      const otherUserId = match.user1Id === userId ? match.user2Id : match.user1Id;
      
      // Set typing indicator in Redis with 5 second expiry
      await redis.set(`match:${matchId}:typing:${userId}`, 'true', 5);
      
      // Notify the other user
      io.to(`user:${otherUserId}`).emit('typing:update', {
        matchId,
        userId,
        isTyping: true,
      });
    } catch (error) {
      logger.error('Error in typing:start handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
  
  /**
   * Handle typing indicators stop
   */
  socket.on('typing:stop', async (data: { matchId: string }) => {
    try {
      const { matchId } = data;
      
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
        select: {
          user1Id: true,
          user2Id: true,
          status: true,
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
      
      // If match is not active, do nothing
      if (match.status !== 'ACTIVE') {
        return;
      }
      
      // Get the other user in the match
      const otherUserId = match.user1Id === userId ? match.user2Id : match.user1Id;
      
      // Remove typing indicator from Redis
      await redis.del(`match:${matchId}:typing:${userId}`);
      
      // Notify the other user
      io.to(`user:${otherUserId}`).emit('typing:update', {
        matchId,
        userId,
        isTyping: false,
      });
    } catch (error) {
      logger.error('Error in typing:stop handler:', error);
      socket.emit('error', {
        code: 'SERVER_ERROR',
        message: 'An error occurred while processing your request',
      });
    }
  });
}; 