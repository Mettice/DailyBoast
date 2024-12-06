import { create } from 'zustand';
import { MoodEntry, MoodAnalytics } from '../types/mood';

interface MoodState {
  entries: MoodEntry[];
  analytics: MoodAnalytics;
  getWeeklyMoods: () => MoodEntry[];
}

export const useMoodStore = create<MoodState>((_set, get) => ({
  entries: [],
  analytics: {
    mostFrequentMood: '',
    improvementTrends: 0,
    weeklyAverage: 0,
    streakCount: 0
  },
  getWeeklyMoods: () => {
    const entries = get().entries;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return entries.filter(entry => 
      new Date(entry.date) >= weekAgo
    );
  }
})); 