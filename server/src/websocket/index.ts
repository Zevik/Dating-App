import { Server as SocketIOServer } from 'socket.io';
import { logger } from '../utils/logger';
import { authenticateSocket } from './middleware/auth';
import { setupMatchHandlers } from './handlers/matchHandlers';
import { setupCallHandlers } from './handlers/callHandlers';
import { setupEventHandlers } from './handlers/eventHandlers';
import { redis } from '../utils/redis';

/**
 * Setup WebSocket server and handlers
 */
export const setupWebsocket = (io: SocketIOServer): void => {
  // Apply middleware
  io.use(authenticateSocket);
  
  // Handle connections
  io.on('connection', async (socket) => {
    const userId = socket.data.user?.id;
    
    if (!userId) {
      logger.warn('Socket connected without user ID');
      socket.disconnect();
      return;
    }
    
    logger.info(`Socket connected: ${socket.id} for user ${userId}`);
    
    // Store socket ID in Redis for user
    await redis.sadd(`user:${userId}:sockets`, socket.id);
    
    // Join user's personal room
    socket.join(`user:${userId}`);
    
    // Setup event handlers
    setupMatchHandlers(io, socket);
    setupCallHandlers(io, socket);
    setupEventHandlers(io, socket);
    
    // Handle disconnection
    socket.on('disconnect', async () => {
      logger.info(`Socket disconnected: ${socket.id} for user ${userId}`);
      
      // Remove socket ID from Redis
      await redis.srem(`user:${userId}:sockets`, socket.id);
      
      // Handle any active calls
      const activeCall = await redis.get(`user:${userId}:activeCall`);
      if (activeCall) {
        // Emit call ended event to the other participant
        const callData = JSON.parse(activeCall);
        const otherUserId = callData.initiatorId === userId
          ? callData.receiverId
          : callData.initiatorId;
        
        io.to(`user:${otherUserId}`).emit('call:ended', {
          callId: callData.id,
          reason: 'disconnected',
        });
        
        // Clear active call
        await redis.del(`user:${userId}:activeCall`);
      }
    });
  });
};

// Utility function to send a message to a specific user
export const sendToUser = async (
  io: SocketIOServer,
  userId: string,
  event: string,
  data: any
): Promise<boolean> => {
  // Get all socket IDs for this user
  const socketIds = await redis.smembers(`user:${userId}:sockets`);
  
  if (socketIds.length === 0) {
    logger.debug(`No active sockets for user ${userId}`);
    return false;
  }
  
  // Send to user's room (reaches all their connected devices)
  io.to(`user:${userId}`).emit(event, data);
  
  return true;
}; 