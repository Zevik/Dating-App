import { createClient } from 'redis';

// Create Redis client
const redis = createClient({
  url: process.env.REDIS_URL
});

// Connect to Redis when this module is imported
redis.connect().catch(err => {
  console.error('Redis connection error:', err);
});

export default redis; 