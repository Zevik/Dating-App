import Redis from 'ioredis';
import { getRedisClient } from '../config/redis';
import { logger } from './logger';

// Create a Redis instance that will be lazily initialized
class RedisWrapper {
  private client: Redis | null = null;
  
  private async getClient(): Promise<Redis> {
    if (!this.client) {
      this.client = await getRedisClient();
    }
    return this.client;
  }
  
  // Redis commands wrapped with proper typing and error handling
  
  async get(key: string): Promise<string | null> {
    try {
      const client = await this.getClient();
      return await client.get(key);
    } catch (error) {
      logger.error('Redis GET error:', error);
      return null;
    }
  }
  
  async set(key: string, value: string, expiry?: number): Promise<boolean> {
    try {
      const client = await this.getClient();
      if (expiry) {
        await client.set(key, value, 'EX', expiry);
      } else {
        await client.set(key, value);
      }
      return true;
    } catch (error) {
      logger.error('Redis SET error:', error);
      return false;
    }
  }
  
  async del(key: string): Promise<boolean> {
    try {
      const client = await this.getClient();
      await client.del(key);
      return true;
    } catch (error) {
      logger.error('Redis DEL error:', error);
      return false;
    }
  }
  
  async sadd(key: string, ...members: string[]): Promise<boolean> {
    try {
      const client = await this.getClient();
      await client.sadd(key, ...members);
      return true;
    } catch (error) {
      logger.error('Redis SADD error:', error);
      return false;
    }
  }
  
  async srem(key: string, ...members: string[]): Promise<boolean> {
    try {
      const client = await this.getClient();
      await client.srem(key, ...members);
      return true;
    } catch (error) {
      logger.error('Redis SREM error:', error);
      return false;
    }
  }
  
  async smembers(key: string): Promise<string[]> {
    try {
      const client = await this.getClient();
      return await client.smembers(key);
    } catch (error) {
      logger.error('Redis SMEMBERS error:', error);
      return [];
    }
  }
  
  async publish(channel: string, message: string): Promise<boolean> {
    try {
      const client = await this.getClient();
      await client.publish(channel, message);
      return true;
    } catch (error) {
      logger.error('Redis PUBLISH error:', error);
      return false;
    }
  }
  
  async expire(key: string, seconds: number): Promise<boolean> {
    try {
      const client = await this.getClient();
      await client.expire(key, seconds);
      return true;
    } catch (error) {
      logger.error('Redis EXPIRE error:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const redis = new RedisWrapper(); 