import { ComplimentCategory, MoodType, Compliment } from '../types';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export class ComplimentService {
  private static baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  private static async fetchWithRetry<T>(
    url: string, 
    options: RequestInit, 
    retries = MAX_RETRIES
  ): Promise<T> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
    throw new Error('Max retries exceeded');
  }

  static async generate(
    category: ComplimentCategory = 'general',
    mood?: MoodType
  ): Promise<Compliment> {
    try {
      const complimentText = await this.generateCompliment({ category, mood });
      
      return {
        id: crypto.randomUUID(),
        text: complimentText,
        category,
        mood: mood || 'neutral',
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      console.error('Error generating compliment:', error);
      return {
        id: crypto.randomUUID(),
        text: this.getDefaultCompliment(category),
        category,
        mood: mood || 'neutral',
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
  }

  static getDefaultCompliment(category: ComplimentCategory): string {
    const defaults: Record<ComplimentCategory, string> = {
      personal: "Your unique perspective brings so much value to those around you.",
      professional: "Your dedication and skill set you apart in everything you do.",
      general: "You make the world a better place just by being you.",
      confidence: "Your confidence inspires others to believe in themselves.",
      motivation: "Your determination is truly admirable.",
      friendship: "You're the kind of friend everyone wishes they had.",
      'self-care': "You deserve all the care and kindness you give to others.",
      success: "Your achievements are a testament to your hard work.",
      creativity: "Your creative spirit brings joy to everyone around you.",
      humor: "Your ability to bring smiles to others is a precious gift.",
      all: "You are amazing in every possible way.",
      inspiration: "Your actions inspire others to dream bigger."
    };

    return defaults[category] || defaults.general;
  }

  static async generateCompliment({ 
    category, 
    mood,
    length = 'medium',
    style = 'casual'
  }: GenerateOptions) {
    try {
      const response = await this.fetchWithRetry(
        `/api/generate-compliment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category,
            mood,
            length,
            style
          }),
        }
      );

      return response.data.compliment;
    } catch (error) {
      console.error('Error generating compliment:', error);
      throw new Error('Failed to generate compliment. Please try again.');
    }
  }
}