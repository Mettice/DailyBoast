import { create } from 'zustand';
import type { Compliment, ComplimentCategory, MoodType } from '../types';
import type { Achievement } from '../data/compliments';

import { analyticsService } from '../services/analyticsService';
import { generateCompliment } from '../services/apiService';

type Toast = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

interface ComplimentStore {
  selectedMood: MoodType | null;
  selectedCategory: ComplimentCategory | null;
  currentCompliment: Compliment | null;
  isLoading: boolean;
  error: string | null;
  savedCompliments: Compliment[];
  stats: {
    complimentsGenerated: number;
    complimentsSaved: number;
  };
  newAchievement: Achievement | null;
  toast: Toast | null;
  setMood: (mood: MoodType) => void;
  setCategory: (category: ComplimentCategory) => void;
  setSelectedCategory: (category: ComplimentCategory) => void;
  handleGetCompliment: () => Promise<void>;
  handleSave: (compliment: Compliment) => void;
  handleShare: (compliment: Compliment) => void;
  setToast: (toast: Toast | null) => void;
  setNewAchievement: (achievement: Achievement | null) => void;
}

export const useComplimentStore = create<ComplimentStore>((set, get) => ({
  selectedMood: null,
  selectedCategory: null,
  currentCompliment: null,
  isLoading: false,
  error: null,
  savedCompliments: [],
  stats: {
    complimentsGenerated: 0,
    complimentsSaved: 0
  },
  newAchievement: null,
  toast: null,

  setMood: (mood) => set({ selectedMood: mood }),
  setCategory: (category) => set({ selectedCategory: category }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  handleGetCompliment: async () => {
    const { selectedMood, selectedCategory } = get();
    console.log('Attempting to generate compliment:', { selectedMood, selectedCategory });
    
    if (!selectedMood || !selectedCategory) {
      console.log('Missing mood or category');
      return;
    }

    set({ isLoading: true, error: null });

    try {
      console.log('Calling API...');
      const response = await generateCompliment(selectedMood, selectedCategory);
      console.log('API response:', response);

      const compliment: Compliment = {
        id: Date.now().toString(),
        text: response.compliment,
        category: selectedCategory,
        mood: selectedMood,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: [selectedCategory, selectedMood]
      };

      set((state) => ({
        currentCompliment: compliment,
        isLoading: false,
        stats: {
          ...state.stats,
          complimentsGenerated: state.stats.complimentsGenerated + 1
        },
        toast: {
          id: Date.now().toString(),
          message: 'New compliment generated!',
          type: 'success'
        }
      }));

      analyticsService.trackEvent('compliment_generated', { category: selectedCategory, mood: selectedMood });
    } catch (error) {
      console.error('Generation error:', error);
      set({ 
        error: 'Failed to generate compliment. Please try again.', 
        isLoading: false,
        toast: {
          id: Date.now().toString(),
          message: 'Failed to generate compliment',
          type: 'error'
        }
      });
    }
  },

  handleSave: (compliment) => {
    set(state => ({
      savedCompliments: [...state.savedCompliments, compliment],
      stats: {
        ...state.stats,
        complimentsSaved: state.stats.complimentsSaved + 1
      },
      toast: {
        id: Date.now().toString(),
        message: 'Compliment saved!',
        type: 'success'
      }
    }));
    analyticsService.trackEvent('compliment_saved', { complimentId: compliment.id });
  },

  handleShare: (compliment) => {
    analyticsService.trackEvent('compliment_shared', { complimentId: compliment.id });
    // Implement share logic
  },

  setToast: (toast) => set({ toast }),
  setNewAchievement: (achievement) => set({ newAchievement: achievement })
}));