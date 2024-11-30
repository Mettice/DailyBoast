import { useState, useEffect } from 'react';
import { MoodType } from '../types/mood';

type ContentType = {
  category: string;
  text: string;
  id: string;
};

interface ProgressStats {
  totalTipsViewed: number;
  totalTipsSaved: number;
  totalComplimentsSaved: number;
  tipsShared: number;
  categoriesExplored: string[];
  moodTracking: {
    totalMoodsLogged: number;
    moodHistory: Array<{
      mood: MoodType;
      timestamp: string;
    }>;
    mostFrequentMood: MoodType | null;
  };
  streakDays: number;
  bestStreak: number;
  lastInteractionDate: string;
  favoriteCategory: {
    name: string;
    count: number;
  } | null;
}

export const useProgress = () => {
  const [stats, setStats] = useState<ProgressStats>(() => {
    const saved = localStorage.getItem('userProgress');
    const defaultStats = {
      totalTipsViewed: 0,
      totalTipsSaved: 0,
      totalComplimentsSaved: 0,
      tipsShared: 0,
      categoriesExplored: [],
      moodTracking: {
        totalMoodsLogged: 0,
        moodHistory: [],
        mostFrequentMood: null
      },
      streakDays: 0,
      bestStreak: 0,
      favoriteCategory: null,
      lastInteractionDate: new Date().toISOString()
    };
    
    if (saved) {
      const parsedStats = JSON.parse(saved);
      return {
        ...defaultStats,
        ...parsedStats,
        categoriesExplored: Array.isArray(parsedStats.categoriesExplored) 
          ? parsedStats.categoriesExplored 
          : [],
        moodTracking: {
          ...defaultStats.moodTracking,
          ...parsedStats.moodTracking
        }
      };
    }
    
    return defaultStats;
  });

  const updateProgress = (
    action: 'view' | 'save' | 'share' | 'mood', 
    content: ContentType | MoodType,
    contentType: 'tip' | 'compliment' | 'mood' = 'tip'
  ) => {
    console.log('UpdateProgress called:', { action, content, contentType });
    
    setStats(prev => {
      if (contentType === 'mood' && typeof content === 'string') {
        console.log('Processing mood update:', content);
        
        const mood = content as MoodType;
        const newMoodHistory = [
          ...(prev.moodTracking?.moodHistory || []),
          { mood, timestamp: new Date().toISOString() }
        ].slice(-30);

        const moodCounts = newMoodHistory.reduce((acc, { mood }) => {
          acc[mood] = (acc[mood] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const mostFrequentMood = Object.entries(moodCounts)
          .sort(([, a], [, b]) => b - a)[0]?.[0] as MoodType || null;

        return {
          ...prev,
          lastInteractionDate: new Date().toISOString(),
          moodTracking: {
            totalMoodsLogged: (prev.moodTracking?.totalMoodsLogged || 0) + 1,
            moodHistory: newMoodHistory,
            mostFrequentMood
          }
        };
      }

      const contentItem = content as ContentType;
      const newCategories = prev.categoriesExplored.includes(contentItem.category) 
        ? prev.categoriesExplored 
        : [...prev.categoriesExplored, contentItem.category];

      console.log('Updating stats for:', contentType);

      return {
        ...prev,
        categoriesExplored: newCategories,
        lastInteractionDate: new Date().toISOString(),
        ...(action === 'view' && { totalTipsViewed: prev.totalTipsViewed + 1 }),
        ...(action === 'save' && contentType === 'tip' && { 
          totalTipsSaved: prev.totalTipsSaved + 1 
        }),
        ...(action === 'save' && contentType === 'compliment' && { 
          totalComplimentsSaved: (prev.totalComplimentsSaved || 0) + 1 
        }),
        ...(action === 'share' && { tipsShared: prev.tipsShared + 1 })
      };
    });
  };

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(stats));
  }, [stats]);

  return { stats, updateProgress };
};