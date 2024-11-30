import { create } from 'zustand';
import { getRandomTip } from '../data/tips';
import { generateTip } from '../services/tipsService';
import type { Tip, TipCategory } from '../types/tips';
import type { MoodType } from '../types';

interface TipsStore {
  currentTip: Tip | null;
  savedTips: Tip[];
  fetchNewTip: (category?: TipCategory, mood?: MoodType) => Promise<void>;
  saveTip: (tip: Tip) => void;
  removeSavedTip: (tipId: string) => void;
}

export const useTipsStore = create<TipsStore>((set) => ({
  currentTip: null,
  savedTips: [],

  fetchNewTip: async (category?: TipCategory, mood?: MoodType) => {
    try {
      if (mood && category) {
        // Use AI-generated tip when both mood and category are provided
        const response = await generateTip(mood, category);
        set({ currentTip: response.tip });
      } else {
        // Fall back to pre-written tips
        set({ currentTip: getRandomTip(category) });
      }
    } catch (error) {
      console.error('Error fetching tip:', error);
      // Fallback to pre-written tip
      set({ currentTip: getRandomTip(category) });
    }
  },

  saveTip: (tip) => {
    set((state) => ({
      savedTips: [...state.savedTips, tip]
    }));
  },

  removeSavedTip: (tipId) => {
    set((state) => ({
      savedTips: state.savedTips.filter(tip => tip.id !== tipId)
    }));
  }
}));