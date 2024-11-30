export type NotificationType = 
  | 'daily-tip'
  | 'achievement'
  | 'streak'
  | 'compliment'
  | 'mood-reminder';

export interface NotificationPreferences {
  enabled: boolean;
  notificationTime: string;
  quietHours: {
    start: string;
    end: string;
  };
  channels: {
    dailyTips: boolean;
    achievements: boolean;
    streaks: boolean;
    compliments: boolean;
    moodTracking: boolean;
  };
} 