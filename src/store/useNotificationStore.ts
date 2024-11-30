import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NotificationPreferences, UserActivity, TimeSlot } from '../types';
import { NotificationService } from '../services/notificationService';
import { SmartNotificationService } from '../services/smartNotificationService';
import { useAnalytics } from '../components/analytics/AnalyticsProvider';

interface NotificationState {
  preferences: {
    enabled: boolean;
    quietHours: {
      start: string;
      end: string;
    };
    notificationTime: string;
    channels: {
      dailyTips: boolean;
      achievements: boolean;
      streaks: boolean;
      compliments: boolean;
      moodTracking: boolean;
    }
  };
  hasPermission: boolean;
  updatePreferences: (updates: Partial<NotificationPreferences>) => void;
  requestPermission: () => Promise<void>;
  scheduleNotifications: () => void;
  activityHistory: UserActivity[];
  smartScheduling: boolean;

  logActivity: (activity: UserActivity) => void;
  enableSmartScheduling: (enabled: boolean) => void;
  getOptimalNotificationTimes: () => Promise<TimeSlot[]>;
  rescheduleNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      preferences: {
        enabled: false as boolean,
        quietHours: {
          start: '22:00',
          end: '08:00'
        },
        notificationTime: '09:00',
        channels: {
          dailyTips: true,
          achievements: true,
          streaks: true,
          compliments: true,
          moodTracking: true
        }
      },
      hasPermission: false,
      activityHistory: [],
      smartScheduling: false,

      updatePreferences: (updates) => {
        const { trackEvent } = useAnalytics();
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...updates
          }
        }));
        
        trackEvent('notification_preferences_updated', {
          updates,
          timestamp: new Date().toISOString()
        });
        
        get().scheduleNotifications();
      },

      requestPermission: async () => {
        const { trackEvent } = useAnalytics();
        try {
          if (!('Notification' in window)) {
            throw new Error('Notifications not supported');
          }
          const permission = await Notification.requestPermission();
          set({ hasPermission: permission === 'granted' });
          
          trackEvent('notification_permission_response', {
            status: permission,
            timestamp: new Date().toISOString()
          });

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          trackEvent('notification_error', {
            error: errorMessage,
            timestamp: new Date().toISOString()
          });
        }
      },

      scheduleNotifications: () => {
        const { preferences } = get();
        if (preferences.enabled && preferences.channels.dailyTips) {
          NotificationService.scheduleDailyTip(preferences.quietHours.end);
        }
      },

      logActivity: (activity) => {
        set((state) => ({
          activityHistory: [...state.activityHistory, activity]
        }));
      },

      enableSmartScheduling: (enabled) => {
        set({ smartScheduling: enabled });
        if (enabled) {
          get().rescheduleNotifications();
        }
      },

      getOptimalNotificationTimes: async (): Promise<TimeSlot[]> => {
        const { activityHistory } = get();
        const slots = await SmartNotificationService.analyzeUserActivity(activityHistory);
        return slots.map(slot => ({
          startTime: slot.startTime,
          endTime: slot.endTime
        }));
      },

      rescheduleNotifications: async () => {
        const { 
          preferences, 
          smartScheduling, 
          activityHistory 
        } = get();

        if (!preferences.enabled) return;

        if (smartScheduling) {
          const timeSlots = await SmartNotificationService.analyzeUserActivity(
            activityHistory
          );

          await SmartNotificationService.scheduleSmartNotification(
            'daily-tip',
            timeSlots,
            preferences.quietHours
          );
        } else {
          // Your existing scheduling logic
        }
      }
    }),
    {
      name: 'notification-storage'
    }
  )
); 