import express from 'express';
import { ComplimentController } from '../controllers/complimentController';
import { cacheCompliment } from '../middleware/cache';

const router = express.Router();

// Retry middleware
const withRetry = async (req: express.Request, res: express.Response, handler: Function, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await handler(req, res);
      return;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      
      if (i === maxRetries - 1) {
        // If all retries failed, send error response
        console.error('All retry attempts failed');
        return res.status(500).json({
          status: 'error',
          message: 'Service temporarily unavailable after multiple retries'
        });
      }
      
      // Wait before next retry using exponential backoff
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
};

// Test endpoint with retry
router.get('/test', async (req, res) => {
  await withRetry(req, res, async () => {
    res.json({
      status: 'success',
      message: 'Test endpoint working'
    });
  });
});

// Main endpoints with retry
router.post('/generate-compliment', cacheCompliment, async (req, res) => {
  await withRetry(req, res, async () => {
    await ComplimentController.generateCompliment(req, res);
  });
});

router.post('/compliment-feedback', async (req, res) => {
  await withRetry(req, res, async () => {
    await ComplimentController.saveFeedback(req, res);
  });
});

export { router as complimentRoutes };