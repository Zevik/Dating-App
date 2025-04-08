import Redis from 'ioredis';
import { logger } from '../utils/logger';

let redisClient: Redis | null = null;

/**
 * Connect to Redis and return client instance
 */
export const connectRedis = async (): Promise<Redis> => {
  if (redisClient) {
    return redisClient;
  }
  
  try {
    const url = process.env.REDIS_URL || 'redis://localhost:6379';
    
    redisClient = new Redis(url, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times: number) => {
        // Retry with exponential backoff
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });
    
    redisClient.on('connect', () => {
      logger.info('Redis connected');
    });
    
    redisClient.on('error', (err) => {
      logger.error('Redis error:', err);
    });
    
    // Test connection
    await redisClient.ping();
    
    return redisClient;
  } catch (error) {
    logger.error('Redis connection failed:', error);
    throw error;
  }
};

/**
 * Get the Redis client instance
 */
export const getRedisClient = async (): Promise<Redis> => {
  if (!redisClient) {
    return await connectRedis();
  }
  
  return redisClient;
};

/**
 * Close the Redis connection
 */
export const closeRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    logger.info('Redis connection closed');
  }
}; 