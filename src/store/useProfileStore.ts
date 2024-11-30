import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, MoodType, ComplimentCategory, MoodTracking } from '../types';

interface ProfileState {
  profile: UserProfile | null;
  moodEntries: MoodTracking['entries'];
  isLoading: boolean;
  error: string | null;
  
  // Profile actions
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePreferences: (preferences: Partial<UserProfile['preferences']>) => void;
  
  // Mood tracking actions
  addMoodEntry: (mood: MoodType, notes?: string, tipId?: string) => void;
  getMoodAnalytics: () => MoodTracking['analytics'];
  
  // Stats actions
  incrementTipViewed: (category: ComplimentCategory) => void;
  updateStreak: (days: number) => void;
  incrementShares: () => void;
}

const calculateMostFrequentMood = (entries: MoodTracking['entries']): MoodType => {
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<MoodType, number>);
  
  return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as MoodType;
};

const analyzeMoodPatterns = (_entries: MoodTracking['entries']) => {
  // Implement pattern analysis logic
  return [];
};

const analyzeImprovementTrends = (_entries: MoodTracking['entries']) => {
  // Implement trend analysis logic
  return [];
};

const calculateFavoriteCategory = (
  profile: UserProfile,
  currentCategory: ComplimentCategory
): ComplimentCategory => {
  const categoryViews = profile.stats.categoryViews || {};
  const updatedViews = {
    ...categoryViews,
    [currentCategory]: (categoryViews[currentCategory] || 0) + 1
  };
  
  return Object.entries(updatedViews)
    .sort((a, b) => b[1] - a[1])[0]?.[0] as ComplimentCategory;
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      moodEntries: [],
      isLoading: false,
      error: null,

      updateProfile: (updates) => {
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null
        }));
      },

      updatePreferences: (preferences) => {
        set((state) => ({
          profile: state.profile ? {
            ...state.profile,
            preferences: { ...state.profile.preferences, ...preferences }
          } : null
        }));
      },

      addMoodEntry: (mood, notes, tipId) => {
        set((state) => ({
          moodEntries: [
            ...state.moodEntries,
            {
              date: new Date(),
              mood,
              notes,
              associatedTip: tipId ? { id: tipId } : undefined
            }
          ]
        }));
      },

      getMoodAnalytics: () => {
        const { moodEntries } = get();
        // Implement mood analytics logic
        return {
          mostFrequentMood: calculateMostFrequentMood(moodEntries),
          moodPatterns: analyzeMoodPatterns(moodEntries),
          improvementTrends: analyzeImprovementTrends(moodEntries)
        };
      },

      incrementTipViewed: (category) => {
        set((state) => ({
          profile: state.profile ? {
            ...state.profile,
            stats: {
              ...state.profile.stats,
              totalComplimentsViewed: state.profile.stats.totalComplimentsViewed + 1,
              favoriteCategory: calculateFavoriteCategory(state.profile, category)
            }
          } : null
        }));
      },

      updateStreak: (days) => {
        set((state) => ({
          profile: state.profile ? {
            ...state.profile,
            stats: {
              ...state.profile.stats,
              longestStreak: Math.max(state.profile.stats.longestStreak, days)
            }
          } : null
        }));
      },

      incrementShares: () => {
        set((state) => ({
          profile: state.profile ? {
            ...state.profile,
            stats: {
              ...state.profile.stats,
              totalShares: state.profile.stats.totalShares + 1
            }
          } : null
        }));
      }
    }),
    {
      name: 'profile-storage'
    }
  )
); 