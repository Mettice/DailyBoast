export type MoodType = 
  | 'energetic'
  | 'peaceful'
  | 'happy'
  | 'sad'
  | 'tired'
  | 'anxious'
  | 'motivated'
  | 'stressed'
  | 'focused'
  | 'angry'
  | 'grateful'
  | 'excited'
  | 'content'
  | 'bored'
  | 'neutral'
  | 'depressed'
  | 'lonely'
  | 'confused'
  | 'disheartened'
  | 'frustrated';

export type ComplimentCategory = 
  | 'personal'
  | 'professional'
  | 'communication'
  | 'financial'
  | 'family'
  | 'love'
  | 'relationships'
  | 'health'
  | 'self-care'
  | 'life'
  | 'creativity'
  | 'humor'
  | 'mindfulness';

export interface Compliment {
  id: string;
  text: string;
  category: ComplimentCategory;
  mood: MoodType;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
} 

export type { TipCategory } from './types/tips';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  profilePicture?: string;
  bio?: string;
  joinDate: string;
  timezone?: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    // ... existing preferences
  };
  stats: {
    totalComplimentsViewed: number;
    totalShares: number;
    longestStreak: number;
    favoriteCategory: ComplimentCategory;
    categoryViews: Record<ComplimentCategory, number>;
  };
}