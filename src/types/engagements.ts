import { ComplimentCategory } from ".";

import { MoodType } from ".";

import { create } from 'zustand'

export const useComplimentStore = create((set) => ({
  fetchNewCompliment: async (category?: ComplimentCategory, mood?: MoodType) => {
    set({ isLoading: true, error: null });
    try { 
      const response = await fetch('http://localhost:3001/api/generate-compliment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, mood }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate compliment');
      }
  
      const data = await response.json();
      if (data.status === 'success' && data.data.compliment) {
        set({ 
          currentCompliment: {
            id: Date.now().toString(),
            text: data.data.compliment,
            category: category || 'general',
            tags: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          isLoading: false 
        });
      } else {
        throw new Error(data.error || 'Failed to generate compliment');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Something went wrong',
        isLoading: false 
      });
    }
  }
}));

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  category: string;
  unlockedAt?: string;
}

export interface Streak {
  currentStreak: number;
  longestStreak: number;
  lastVisit: string;
  startDate: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  compliments: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalCompliments: number;
  complimentsShared: number;
  complimentsSaved: number;
  collectionsCreated: number;
  categoriesExplored: string[];
  moodsExplored: string[];
}