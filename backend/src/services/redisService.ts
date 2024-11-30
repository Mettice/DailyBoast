import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

class RedisService {
  private static instance: RedisService;
  private client: Redis;

  private constructor() {
    if (!process.env.REDIS_URL) {
      throw new Error('REDIS_URL environment variable is required');
    }
    this.client = new Redis(process.env.REDIS_URL);
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public async getCached(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  public async setCache(key: string, value: string, expiry: number): Promise<void> {
    await this.client.setex(key, expiry, value);
  }

  public async saveFeedback(complimentId: string, positive: boolean, feedback?: string): Promise<void> {
    await this.client.zadd('compliment_ratings', positive ? 1 : -1, complimentId);
    if (feedback) {
      await this.client.hset('compliment_feedback', complimentId, feedback);
    }
  }

  public getClient(): Redis {
    return this.client;
  }
}

export const redisService = RedisService.getInstance();