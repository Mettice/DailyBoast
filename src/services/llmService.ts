import axios from 'axios';
import { ComplimentCategory } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ComplimentResponse {
  status: string;
  data: {
    compliment: string;
    category: ComplimentCategory;
    mood?: string;
    fromCache: boolean;
    timestamp: string;
  };
}

export class ComplimentService {
  static async generateCompliment(category: ComplimentCategory, mood?: string) {
    try {
      console.log('Generating compliment:', { category, mood });
      const response = await axios.post<ComplimentResponse>(`${API_URL}/generate-compliment`, {
        category,
        mood
      });

      if (response.data?.data?.compliment) {
        return response.data.data.compliment;
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('LLM Service Error:', error);
      throw error;
    }
  }

  static async submitFeedback(complimentId: string, positive: boolean, feedback?: string) {
    try {
      const response = await axios.post(`${API_URL}/compliment-feedback`, {
        complimentId,
        positive,
        feedback
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  }
}

