import type { TipCategory } from '../types/tips';
import type { MoodType } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const generateTip = async (mood: MoodType, category: TipCategory) => {
  try {
    const response = await fetch(`${API_URL}/api/tips/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood, category }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate tip');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating tip:', error);
    throw error;
  }
}; 