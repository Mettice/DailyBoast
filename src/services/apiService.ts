import type { MoodType, ComplimentCategory } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const generateCompliment = async (mood: MoodType, category: ComplimentCategory) => {
  try {
    console.log('Making request to:', `${API_URL}/api/compliments/generate`);
    const response = await fetch(`${API_URL}/api/compliments/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood, category }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate compliment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating compliment:', error);
    throw error;
  }
}; 