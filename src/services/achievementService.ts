import { ComplimentCategory, MoodType } from '../types';
import type { Achievement } from '../data/compliments';

export interface AchievementProgress {
  currentValue: number;
  targetValue: number;
  isComplete: boolean;
  completedAt?: Date;
}

export const ACHIEVEMENTS = {
  FIRST_JOY: 'first-joy',
  CONSISTENT_JOY: 'consistent-joy',
  WEEK_OF_POSITIVITY: 'week-of-positivity',
  MOOD_EXPLORER: 'mood-explorer',
  CATEGORY_MASTER: 'category-master',
  COLLECTION_CREATOR: 'collection-creator',
  SHARING_SPIRIT: 'sharing-spirit',
  DAILY_STREAK: 'daily-streak'
} as const;

export class AchievementService {
  static checkAchievements(stats: {
    complimentsGenerated: number;
    complimentsSaved: number;
    categoriesExplored: Set<ComplimentCategory>;
    moodsExplored: Set<MoodType>;
    streak: number;
    collections: number;
    shared: number;
  }): Achievement[] {
    return [
      {
        id: ACHIEVEMENTS.DAILY_STREAK,
        title: 'Daily Devotion',
        description: 'Maintain a daily streak',
        progress: Math.min(stats.streak, 1),
        target: 1,
        icon: '📅',
        category: 'streak',
        type: 'milestone',
        isUnlocked: stats.streak >= 1,
        unlockedAt: stats.streak >= 1 ? new Date() : undefined
      },
      {
        id: ACHIEVEMENTS.FIRST_JOY,
        title: 'First Joy',
        description: 'Receive your first compliment',
        progress: Math.min(stats.complimentsGenerated, 1),
        target: 1,
        icon: '✨',
        category: 'basic',
        type: 'milestone',
        isUnlocked: stats.complimentsGenerated >= 1,
        unlockedAt: stats.complimentsGenerated >= 1 ? new Date() : undefined
      },
      {
        id: ACHIEVEMENTS.CONSISTENT_JOY,
        title: 'Consistent Joy',
        description: 'Maintain a 3-day streak',
        progress: Math.min(stats.streak, 3),
        target: 3,
        icon: '🔥',
        category: 'streak',
        type: 'milestone',
        isUnlocked: stats.streak >= 3,
        unlockedAt: stats.streak >= 3 ? new Date() : undefined
      },
      {
        id: ACHIEVEMENTS.WEEK_OF_POSITIVITY,
        title: 'Week of Positivity',
        description: 'Maintain a 7-day streak',
        progress: Math.min(stats.streak, 7),
        target: 7,
        icon: '🌟',
        category: 'streak',
        type: 'milestone',
        isUnlocked: stats.streak >= 7,
        unlockedAt: stats.streak >= 7 ? new Date() : undefined
      },
      {
        id: ACHIEVEMENTS.MOOD_EXPLORER,
        title: 'Mood Explorer',
        description: 'Experience 5 different moods',
        progress: Math.min(stats.moodsExplored.size, 5),
        target: 5,
        icon: '🎭',
        category: 'exploration',
        type: 'milestone',
        isUnlocked: stats.moodsExplored.size >= 5,
        unlockedAt: stats.moodsExplored.size >= 5 ? new Date() : undefined
      },
      {
        id: ACHIEVEMENTS.CATEGORY_MASTER,
        title: 'Category Master',
        description: 'Explore all compliment categories',
        progress: stats.categoriesExplored.size,
        target: 10,
        icon: '🎯',
        category: 'exploration',
        type: 'milestone',
        isUnlocked: stats.categoriesExplored.size >= 10,
        unlockedAt: stats.categoriesExplored.size >= 10 ? new Date() : undefined
      },
      {
        id: ACHIEVEMENTS.COLLECTION_CREATOR,
        title: 'Collection Creator',
        description: 'Create your first collection',
        progress: Math.min(stats.collections, 1),
        target: 1,
        icon: '📚',
        category: 'collection',
        type: 'milestone',
        isUnlocked: stats.collections >= 1,
        unlockedAt: stats.collections >= 1 ? new Date() : undefined
      },
      {
        id: ACHIEVEMENTS.SHARING_SPIRIT,
        title: 'Sharing Spirit',
        description: 'Share joy with others 5 times',
        progress: Math.min(stats.shared, 5),
        target: 5,
        icon: '🎁',
        category: 'social',
        type: 'milestone',
        isUnlocked: stats.shared >= 5,
        unlockedAt: stats.shared >= 5 ? new Date() : undefined
      }
    ];
  }

  static getAchievementProgress(achievement: Achievement): AchievementProgress {
    return {
      currentValue: achievement.progress!,
      targetValue: achievement.target!,
      isComplete: achievement.progress! >= achievement.target!,
      completedAt: achievement.unlockedAt ? new Date(achievement.unlockedAt) : undefined
    };
  }

  static calculateLevel(achievements: Achievement[]): number {
    const unlockedCount = achievements.filter(a => a.isUnlocked).length;
    return Math.floor(unlockedCount / 3) + 1; // Level up every 3 achievements
  }
}