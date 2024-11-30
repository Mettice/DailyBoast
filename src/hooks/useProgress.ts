import { useState, useEffect } from 'react';
import { Tip } from '../types/tips';

interface ProgressStats {
  totalTipsViewed: number;
  totalTipsSaved: number;
  tipsShared: number;
  categoriesExplored: string[];
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
      tipsShared: 0,
      categoriesExplored: [],
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
          : []
      };
    }
    
    return defaultStats;
  });

  const updateProgress = (action: 'view' | 'save' | 'share', tip: Tip) => {
    setStats(prev => {
      const newCategories = prev.categoriesExplored.includes(tip.category) 
        ? prev.categoriesExplored 
        : [...prev.categoriesExplored, tip.category];

      return {
        ...prev,
        categoriesExplored: newCategories,
        lastInteractionDate: new Date().toISOString(),
        ...(action === 'view' && { totalTipsViewed: prev.totalTipsViewed + 1 }),
        ...(action === 'save' && { totalTipsSaved: prev.totalTipsSaved + 1 }),
        ...(action === 'share' && { tipsShared: prev.tipsShared + 1 })
      };
    });
  };

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(stats));
  }, [stats]);

  return { stats, updateProgress };
};