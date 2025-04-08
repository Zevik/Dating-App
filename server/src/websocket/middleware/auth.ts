import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { prisma } from '../../index';
import { logger } from '../../utils/logger';
import { ExtendedError } from 'socket.io/dist/namespace';

/**
 * Socket.io middleware to authenticate connections
 */
export const authenticateSocket = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return next(new Error('Authentication required'));
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        isActive: true,
      },
    });
    
    if (!user || !user.isActive) {
      return next(new Error('Invalid or expired token'));
    }
    
    // Attach user info to socket
    socket.data.user = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    };
    
    // Update last active timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActive: new Date() },
    });
    
    logger.debug(`Socket authenticated for user: ${user.id}`);
    
    next();
  } catch (error) {
    logger.error('Socket authentication error:', error);
    next(new Error('Authentication failed'));
  }
}; 