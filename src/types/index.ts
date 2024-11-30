import { TipCategory } from './tips';
import { MoodType } from './mood';

export type ComplimentCategory = 
  | 'all'
  | 'personal'
  | 'professional'
  | 'general'
  | 'confidence'
  | 'motivation'
  | 'friendship'
  | 'self-care'
  | 'success'
  | 'creativity'
  | 'humor'
  | 'inspiration';

export type CategoryFilter = ComplimentCategory;

export type { MoodType } from './mood';

export type { TipCategory } from './tips';

export interface ComplimentRequest {
  category?: ComplimentCategory;
  mood?: MoodType;
}

export interface ComplimentResponse {
  status: 'success' | 'error';
  data?: {
    compliment: string;
    category: ComplimentCategory;
    mood?: MoodType;
    fromCache: boolean;
    timestamp: string;
  };
  error?: string;
}

export interface Compliment {
  id: string;
  text: string;
  category: ComplimentCategory;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  mood: MoodType;
}

export interface ComplimentStore {
  currentCompliment: Compliment | null;
  savedCompliments: Compliment[];
  fetchNewCompliment: (category?: ComplimentCategory) => void;
  saveCompliment: (compliment: Compliment) => void;
  removeSavedCompliment: (id: string) => void;
  preferences: UserPreferences;
  updatePreferences: (preferences: UserPreferences) => void;
  isLoading: boolean;
  error: string | null;
  selectedMood: MoodType | null;
  stats: {
    complimentsGenerated: number;
    complimentsSaved: number;
    categoriesExplored: Set<ComplimentCategory>;
    moodsExplored: Set<MoodType>;
  };
  newAchievement: Achievement | null;
  setNewAchievement: (achievement: Achievement | null) => void;
  setMood: (mood: MoodType | null) => void;
  clearError: () => void;
  selectedCategory: CategoryFilter;
  setSelectedCategory: (category: CategoryFilter) => void;
  handleGetCompliment: () => void;
  handleShare: (compliment: Compliment) => void;
}

export * from './notifications';

export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    language: Language;
    notificationsEnabled: boolean;
    autoplayAnimations: boolean;
    fontSize: 'small' | 'medium' | 'large';
    notificationTime?: string;
    channels: {
      dailyTips: boolean;
      achievements: boolean;
      streaks: boolean;
    };
    favoriteCategories?: TipCategory[];
  }

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    type: 'milestone' | 'special' | 'daily';
    progress: number;
    target: number;
    category: string;
    isUnlocked: boolean;
    unlockedAt: Date | undefined;
  }

  export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'zh' | 'ja' | 'ko'; 

  export interface Theme {
    borderRadius: string;
    shadows: {
      medium: string;
    };
    colors: {
      background: string;
      text: string;
    };
  } 

  export type SharingPlatform = 
  | 'facebook' 
  | 'twitter' 
  | 'linkedin' 
  | 'whatsapp' 
  | 'telegram' 
  | 'email' 
  | 'copy'
  | 'download';

  export type ToastType = 'success' | 'error' | 'info';

  export type Toast = { 
    message: string;
    type: ToastType;
  }

  export interface UserActivity {
    timestamp: Date;
    type: 'interaction' | 'notification' | 'compliment' | 'mood';
    details: {
        action: string;
        category?: ComplimentCategory;
        mood?: MoodType;
        
    };      
  }


  export interface TimeSlot {
    startTime: string;
    endTime: string;
  }

  export interface UserProfile {
    id: string;
    preferences: UserPreferences;
    username: string;
    joinDate: Date;
    stats: {
      totalComplimentsViewed: number;
      longestStreak: number;
      totalShares: number;
      favoriteCategory: ComplimentCategory;
      categoryViews: Record<ComplimentCategory, number>;
      

    };
  }

  export interface MoodTracking {
    entries: Array<{
      date: Date;
      mood: MoodType;
      notes?: string;
      associatedTip?: { id: string };
    }>;
    analytics?: {
      mostFrequentMood: MoodType;
      moodPatterns: any; // You can define a more specific type later
      improvementTrends: any; // You can define a more specific type later
    };
  }



