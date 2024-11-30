import { Request, Response, NextFunction } from 'express';
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export const cacheCompliment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, mood } = req.body;
    const cacheKey = `compliment:${category || 'general'}:${mood || 'default'}`;
    
    const cachedCompliment = await redis.get(cacheKey);
    
    if (cachedCompliment) {
      return res.json({
        status: 'success',
        data: {
          compliment: JSON.parse(cachedCompliment),
          category: category || 'general',
          mood,
          fromCache: true,
          timestamp: new Date().toISOString()
        }
      });
    }
    
    next();
  } catch (error) {
    console.error('Cache middleware error:', error);
    next();
  }
};