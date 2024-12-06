import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, ComplimentCategory } from '../types';
import { MoodEntry, MoodAnalytics, MoodType } from '../types/mood';
import { v4 as uuidv4 } from 'uuid';

interface ProfileState {
  profile: UserProfile | null;
  moodEntries: MoodEntry[];
  isLoading: boolean;
  error: string | null;
  
  // Profile actions
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePreferences: (preferences: Partial<UserProfile['preferences']>) => void;
  
  // Mood tracking actions
  addMoodEntry: (mood: MoodType, notes?: string, tipId?: string) => void;
  getMoodAnalytics: () => MoodAnalytics;
  
  // Stats actions
  incrementTipViewed: (category: ComplimentCategory) => void;
  updateStreak: (days: number) => void;
  incrementShares: () => void;
}

const calculateMostFrequentMood = (entries: MoodEntry[]): MoodType => {
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<MoodType, number>);
  
  return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as MoodType;
};

const analyzeMoodPatterns = (entries: MoodEntry[]) => {
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<MoodType, number>);

  return Object.entries(moodCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([mood, count]) => ({ mood, count }));
};

const analyzeImprovementTrends = (entries: MoodEntry[]) => {
  if (entries.length < 2) return 0;

  const moodValues = entries.map(entry => getMoodValue(entry.mood));
  const averageChange = moodValues.reduce((acc, val, i) => {
    if (i === 0) return 0;
    return acc + (val - moodValues[i - 1]);
  }, 0) / (moodValues.length - 1);

  return averageChange;
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

const calculateWeeklyAverage = (entries: MoodEntry[]): number => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const weeklyEntries = entries.filter(entry => 
    new Date(entry.date) >= weekAgo
  );

  if (weeklyEntries.length === 0) return 0;

  const sum = weeklyEntries.reduce((acc, entry) => 
    acc + getMoodValue(entry.mood), 0
  );
  
  return sum / weeklyEntries.length;
};

const getMoodValue = (mood: MoodType): number => {
  const moodValues: Record<MoodType, number> = {
    energetic: 9,
    peaceful: 8,
    motivated: 9,
    tired: 3,
    focused: 7,
    happy: 9,
    sad: 3,
    anxious: 4,
    stressed: 3,
    angry: 2,
    frustrated: 3,
    depressed: 1,
    lonely: 2,
    bored: 4,
    confused: 4,
    disheartened: 2,
    neutral: 5,
    grateful: 8,
    excited: 9,
    content: 7
  };
  return moodValues[mood];
};

const calculateStreak = (entries: MoodEntry[]): number => {
  if (entries.length === 0) return 0;

  let streak = 1;
  let maxStreak = 1;
  const sortedEntries = entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  for (let i = 1; i < sortedEntries.length; i++) {
    const prevDate = new Date(sortedEntries[i - 1].date);
    const currDate = new Date(sortedEntries[i].date);
    const diffInDays = (currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24);

    if (diffInDays === 1) {
      streak++;
      maxStreak = Math.max(maxStreak, streak);
    } else {
      streak = 1;
    }
  }

  return maxStreak;
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
          profile: state.profile ? {
            ...state.profile,
            ...updates,
            preferences: {
              ...state.profile.preferences,
              ...(updates.preferences || {})
            },
            stats: {
              ...state.profile.stats,
              ...(updates.stats || {})
            }
          } : null
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
              id: uuidv4(),
              date: new Date().toISOString(),
              mood,
              notes,
              associatedTip: tipId ? { id: tipId } : undefined
            }
          ]
        }));
      },

      getMoodAnalytics: () => {
        const { moodEntries } = get();
        const patterns = analyzeMoodPatterns(moodEntries);
        
        return {
          mostFrequentMood: calculateMostFrequentMood(moodEntries),
          moodPatterns: patterns,
          improvementTrends: analyzeImprovementTrends(moodEntries),
          weeklyAverage: calculateWeeklyAverage(moodEntries),
          streakCount: calculateStreak(moodEntries)
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