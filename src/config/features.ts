interface AppFeature {
    key: string;
    title: string;
    description: string;
    priority: 'core' | 'secondary' | 'future';
  }
  
  const coreFeatures: AppFeature[] = [
    {
      key: 'smart-compliments',
      title: 'Context-Aware Compliments',
      description: 'Compliments that adapt to time of day, user mood, and previous interactions',
      priority: 'core'
    },
    {
      key: 'category-match',
      title: 'Perfect Category Match',
      description: 'Different compliment types for different needs - work, personal, creativity',
      priority: 'core'
    },
    {
      key: 'daily-streak',
      title: 'Daily Positivity Streak',
      description: 'Build a habit of positivity with daily streaks and rewards',
      priority: 'core'
    },
    {
      key: 'share-joy',
      title: 'Share the Joy',
      description: 'Easily share compliments with friends or save favorites',
      priority: 'core'
    }
  ];
  
  // What makes us different
  const uniqueValue = {
    mainPoint: 'Not just random compliments - we understand context and deliver what you need',
    target: 'For people who want meaningful encouragement, not just generic positivity',
    execution: 'Smart, simple, and genuine - no fluff, just real impact'
  };

  export const FEATURES = {
    AI_GENERATION: true,
    MOOD_BASED_COMPLIMENTS: true,
    SAVE_FAVORITES: true,
    DAILY_NOTIFICATIONS: false, // Coming soon
    SOCIAL_SHARING: true,
    ACHIEVEMENTS: false, // Coming soon
    CUSTOM_THEMES: true,
    CATEGORIES: true,
    FEEDBACK: true
  } as const;
  
  export const AI_CONFIG = {
    MAX_RETRIES: 3,
    CACHE_DURATION: 3600, // 1 hour in seconds
    TEMPERATURE: 0.7,
    MAX_TOKENS: 50,
    MODEL: 'gpt-4'
  } as const;
  
  export const APP_CONFIG = {
    MAX_SAVED_COMPLIMENTS: 50,
    REFRESH_COOLDOWN: 1000, // ms
    ANIMATION_DURATION: 300, // ms
    DEFAULT_THEME: 'light',
    DEFAULT_CATEGORY: 'all'
  } as const;
  
  export const CACHE_KEYS = {
    SAVED_COMPLIMENTS: 'saved_compliments',
    USER_PREFERENCES: 'user_preferences',
    GENERATED_COMPLIMENTS: 'generated_compliments'
  } as const;