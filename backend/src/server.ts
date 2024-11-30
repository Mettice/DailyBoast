import express from 'express';
import cors from 'cors';
import openai from './config/openai';
import { OpenAIError } from 'openai';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://192.168.1.11:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/compliments/generate', async (req, res) => {
  try {
    const { mood, category } = req.body;
    console.log('Received request:', { mood, category });

    if (!mood || !category) {
      return res.status(400).json({ 
        error: 'Mood and category are required' 
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a compassionate AI that generates personalized compliments."
        },
        {
          role: "user",
          content: `Generate a heartfelt ${category} compliment for someone feeling ${mood}.`
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No completion generated');
    }

    const compliment = completion.choices[0].message.content;
    console.log('Generated compliment:', compliment);
    res.json({ compliment });
  } catch (error: unknown) {
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });

    if (error instanceof OpenAIError) {
      res.status(500).json({ error: 'OpenAI service error', details: error.message });
    } else {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: 'Failed to generate compliment', details: message });
    }
  }
});

app.post('/api/tips/generate', async (req, res) => {
  try {
    const { mood, category } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates mindfulness and wellness tips. Keep tips concise, practical, and uplifting."
        },
        {
          role: "user",
          content: `Generate a short, practical ${category} tip for someone feeling ${mood}. Keep it under 100 characters if possible.`
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    const tip = completion.choices[0]?.message?.content;
    res.json({ 
      tip: {
        id: Date.now().toString(),
        category,
        text: tip || 'Take a deep breath and focus on the present moment.',
        tags: [category, mood]
      }
    });
  } catch (error) {
    console.error('Error generating tip:', error);
    res.status(500).json({ error: 'Failed to generate tip' });
  }
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
  res.status(500).json({ error: err.message });
});

export default app;