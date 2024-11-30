import { Request, Response } from 'express';
import { OpenAI } from 'openai';
import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  retryStrategy: (times) => {
    console.log(`Redis retry attempt ${times}`);
    return Math.min(times * 50, 2000);
  }
});

redis.on('error', (err: Error & { code?: string }) => {
  console.error('Redis connection error:', err);
  console.error('Error details:', {
    message: err.message,
    code: err.code,
    stack: err.stack
  });
});

redis.on('connect', () => {
  console.log('Redis connected successfully');
});

const CATEGORY_PROMPTS = {
  all: 'general positive attributes',
  personal: 'individual qualities and characteristics',
  professional: 'achievements and work ethic',
  general: 'overall positive qualities',
  confidence: 'self-worth and inner strength',
  motivation: 'drive and determination',
  friendship: 'being a great friend and social connections',
  'self-care': 'taking care of oneself and personal growth',
  success: 'achievements and accomplishments',
  creativity: 'innovative thinking and artistic expression',
  humor: 'bringing joy and laughter to others'
};

export class ComplimentController {
  static async test(req: Request, res: Response) {
    try {
      console.log('Test endpoint hit');
      // Return a proper test response
      res.json({ 
        status: 'success',
        message: 'API is working!',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Test endpoint error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async generateCompliment(req: Request, res: Response) {
    try {
      const { category, mood } = req.body;
      console.log('Generate compliment request:', { category, mood });
  
      // Try a basic Redis operation
      await redis.set('test', 'test');
      const testResult = await redis.get('test');
      console.log('Redis test result:', testResult);
  
      let prompt = 'Generate a heartfelt, authentic compliment';
      
      if (category && category in CATEGORY_PROMPTS) {
        prompt += ` focusing on ${CATEGORY_PROMPTS[category as keyof typeof CATEGORY_PROMPTS]}`;
      }
      
      if (mood) {
        switch(mood) {
          case 'lonely':
          case 'sad':
          case 'depressed':
            prompt += ' that provides comfort and reminds them of their worth';
            break;
          case 'anxious':
          case 'stressed':
          case 'frustrated':
          case 'angry':
            prompt += ' that helps them feel grounded and capable';
            break;
          case 'happy':
          case 'motivated':
          case 'energetic':
            prompt += ' that celebrates and amplifies their positive state';
            break;
          case 'calm':
          case 'peaceful':
          case 'focused':
            prompt += ' that acknowledges their balanced and centered state';
            break;
          default:
            prompt += ` suitable for their current mood`;
        }
      }
  
      prompt += '. Make it personal and specific, under 100 characters, without emojis or exclamation marks.';
  
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { 
            role: "system", 
            content: "You are a compassionate assistant specialized in generating genuine, uplifting compliments."
          },
          { 
            role: "user", 
            content: prompt 
          }
        ],
        temperature: 0.7,
        max_tokens: 50
      });
  
      const generatedCompliment = completion.choices[0].message.content?.trim();
  
      if (generatedCompliment) {
        // Cache the result
        const cacheKey = `compliment:${category || 'general'}:${mood || 'default'}`;
        await redis.setex(cacheKey, 3600, JSON.stringify(generatedCompliment));
  
        res.json({
          status: 'success',
          data: {
            compliment: generatedCompliment,
            category: category || 'general',
            mood,
            fromCache: false,
            timestamp: new Date().toISOString()
          }
        });
      } else {
        res.status(400).json({ 
          status: 'error',
          error: 'Failed to generate compliment' 
        });
      }
    } catch (error) {
      console.error('Error generating compliment:', error);
      res.status(500).json({ 
        status: 'error',
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Failed to generate compliment'
      });
    }
  }

  static async saveFeedback(req: Request, res: Response) {
    try {
      const { complimentId, positive, feedback } = req.body;
      console.log('Save feedback request:', { complimentId, positive, feedback });

      // Validate input
      if (!complimentId) {
        return res.status(400).json({
          status: 'error',
          error: 'ComplimentId is required'
        });
      }

      if (typeof positive !== 'boolean') {
        return res.status(400).json({
          status: 'error',
          error: 'Positive must be a boolean value'
        });
      }

      await redis.zadd('compliment_ratings', positive ? 1 : -1, complimentId);
      if (feedback) {
        await redis.hset('compliment_feedback', complimentId, feedback);
      }

      res.json({
        status: 'success',
        data: {
          complimentId,
          positive,
          hasFeedback: !!feedback,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error saving feedback:', error);
      res.status(500).json({ 
        status: 'error',
        error: 'Internal server error',
        message: 'Failed to save feedback'
      });
    }
  }
}