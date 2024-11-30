import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // Handle OpenAI API errors
  if (err.response?.status === 429) {
    return res.status(429).json({
      status: 'error',
      error: 'Rate limit exceeded. Please try again later.'
    });
  }

  // Handle Redis errors
  if (err.name === 'RedisError') {
    return res.status(503).json({
      status: 'error',
      error: 'Cache service unavailable'
    });
  }

  // Default error response
  res.status(500).json({
    status: 'error',
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};