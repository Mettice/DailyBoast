import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Achievement, Streak, Collection, UserStats } from '../types/engagements';

interface EngagementStore {
  streak: Streak;
  achievements: Achievement[];
  collections: Collection[];
  stats: UserStats;
  updateStreak: () => void;
  createCollection: (name: string, description: string) => void;
  addToCollection: (collectionId: string, complimentId: string) => void;
  checkAchievements: () => void;
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-compliment',
    title: 'First Joy',
    description: 'Receive your first compliment',
    icon: '✨',
    progress: 0,
    target: 1,
    category: 'interaction'
  },
  {
    id: 'streak-3',
    title: 'Consistent Joy',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    progress: 0,
    target: 3,
    category: 'streak'
  },
  {
    id: 'streak-7',
    title: 'Week of Positivity',
    description: 'Maintain a 7-day streak',
    icon: '🌟',
    progress: 0,
    target: 7,
    category: 'streak'
  },
  {
    id: 'collection-creator',
    title: 'Collector',
    description: 'Create your first collection',
    icon: '📚',
    progress: 0,
    target: 1,
    category: 'collection'
  },
  {
    id: 'spread-joy',
    title: 'Joy Spreader',
    description: 'Share 5 compliments',
    icon: '🎯',
    progress: 0,
    target: 5,
    category: 'sharing'
  }
];

export const useEngagementStore = create<EngagementStore>()(
  persist(
    (set, get) => ({
      streak: {
        currentStreak: 0,
        longestStreak: 0,
        lastVisit: new Date().toISOString(),
        startDate: new Date().toISOString()
      },
      achievements: INITIAL_ACHIEVEMENTS,
      collections: [],
      stats: {
        totalCompliments: 0,
        complimentsShared: 0,
        complimentsSaved: 0,
        collectionsCreated: 0,
        categoriesExplored: [],
        moodsExplored: []
      },

      updateStreak: () => {
        const { streak } = get();
        const lastVisit = new Date(streak.lastVisit);
        const today = new Date();
        const diffDays = Math.floor((today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Perfect streak continuation
          set((state) => ({
            streak: {
              ...state.streak,
              currentStreak: state.streak.currentStreak + 1,
              longestStreak: Math.max(state.streak.currentStreak + 1, state.streak.longestStreak),
              lastVisit: today.toISOString()
            }
          }));
        } else if (diffDays > 1) {
          // Streak broken
          set((state) => ({
            streak: {
              ...state.streak,
              currentStreak: 1,
              lastVisit: today.toISOString()
            }
          }));
        }

        get().checkAchievements();
      },

      createCollection: (name: string, description: string) => {
        const newCollection: Collection = {
          id: Date.now().toString(),
          name,
          description,
          compliments: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        set((state) => ({
          collections: [...state.collections, newCollection],
          stats: {
            ...state.stats,
            collectionsCreated: state.stats.collectionsCreated + 1
          }
        }));

        get().checkAchievements();
      },

      addToCollection: (collectionId: string, complimentId: string) => {
        set((state) => ({
          collections: state.collections.map((collection) =>
            collection.id === collectionId
              ? {
                  ...collection,
                  compliments: [...collection.compliments, complimentId],
                  updatedAt: new Date().toISOString()
                }
              : collection
          )
        }));
      },

      checkAchievements: () => {
        const { streak, stats, achievements } = get();
        const updatedAchievements = achievements.map((achievement) => {
          switch (achievement.id) {
            case 'first-compliment':
              return {
                ...achievement,
                progress: stats.totalCompliments,
                unlockedAt: stats.totalCompliments >= 1 ? new Date().toISOString() : undefined
              };
            case 'streak-3':
              return {
                ...achievement,
                progress: streak.currentStreak,
                unlockedAt: streak.currentStreak >= 3 ? new Date().toISOString() : undefined
              };
            case 'streak-7':
              return {
                ...achievement,
                progress: streak.currentStreak,
                unlockedAt: streak.currentStreak >= 7 ? new Date().toISOString() : undefined
              };
            case 'collection-creator':
              return {
                ...achievement,
                progress: stats.collectionsCreated,
                unlockedAt: stats.collectionsCreated >= 1 ? new Date().toISOString() : undefined
              };
            case 'spread-joy':
              return {
                ...achievement,
                progress: stats.complimentsShared,
                unlockedAt: stats.complimentsShared >= 5 ? new Date().toISOString() : undefined
              };
            default:
              return achievement;
          }
        });

        set({ achievements: updatedAchievements });
      }
    }),
    {
      name: 'engagement-storage'
    }
  )
);