import { createClient } from 'redis';

// Create a mock Redis client for development when real Redis is unavailable
const mockRedis = {
  isConnected: false,
  storage: new Map<string, string>(),
  
  async get(key: string): Promise<string | null> {
    console.warn(`[MOCK REDIS] Getting key: ${key}`);
    return this.storage.get(key) || null;
  },
  
  async setEx(key: string, seconds: number, value: string): Promise<void> {
    console.warn(`[MOCK REDIS] Setting key: ${key} with TTL: ${seconds}s`);
    this.storage.set(key, value);
    // Simulate TTL by scheduling deletion
    setTimeout(() => this.storage.delete(key), seconds * 1000);
  },
  
  async del(key: string): Promise<void> {
    console.warn(`[MOCK REDIS] Deleting key: ${key}`);
    this.storage.delete(key);
  }
};

// Create real Redis client
const realRedis = createClient({
  url: process.env.REDIS_URL
});

// Try to connect to Redis, use mock if connection fails
let redisClient = realRedis;
let isUsingMockRedis = false;

// Connect to Redis when this module is imported
realRedis.connect().catch(err => {
  console.error('Redis connection error:', err);
  console.warn('Using mock Redis client instead. This is fine for development but should not be used in production.');
  isUsingMockRedis = true;
  redisClient = mockRedis as any;
});

// Create a wrapper with try/catch for all operations
const redis = {
  async get(key: string): Promise<string | null> {
    try {
      if (isUsingMockRedis) return mockRedis.get(key);
      return await redisClient.get(key);
    } catch (e) {
      console.warn(`Redis get operation failed for key ${key}:`, e);
      return null;
    }
  },
  
  async setEx(key: string, seconds: number, value: string): Promise<void> {
    try {
      if (isUsingMockRedis) return mockRedis.setEx(key, seconds, value);
      await redisClient.setEx(key, seconds, value);
    } catch (e) {
      console.warn(`Redis setEx operation failed for key ${key}:`, e);
    }
  },
  
  async del(key: string): Promise<void> {
    try {
      if (isUsingMockRedis) return mockRedis.del(key);
      await redisClient.del(key);
    } catch (e) {
      console.warn(`Redis del operation failed for key ${key}:`, e);
    }
  }
};

export default redis; 