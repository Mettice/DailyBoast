import { NotificationPreferences } from '../types';

export class NotificationService {
  private static instance: NotificationService;
  private hasPermission = false;

  private constructor() {
    this.checkPermission();
  }

  public static getInstance(): NotificationService {
    if (!this.instance) {
      this.instance = new NotificationService();
    }
    return this.instance;
  }

  private async checkPermission(): Promise<void> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return;
    }

    if (Notification.permission === 'granted') {
      this.hasPermission = true;
    } else if (Notification.permission !== 'denied') {
      this.hasPermission = await this.requestPermission();
    }
  }

  public async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      return false;
    }

    const permission = await Notification.requestPermission();
    this.hasPermission = permission === 'granted';
    return this.hasPermission;
  }

  public async scheduleNotification(preferences: NotificationPreferences): Promise<void> {
    if (!this.hasPermission && !(await this.requestPermission())) {
      return;
    }

    const scheduledTime = this.calculateNextNotificationTime(preferences.notificationTime);
    const timeUntilNotification = scheduledTime.getTime() - Date.now();

    setTimeout(() => this.showNotification(), timeUntilNotification);
  }

  private calculateNextNotificationTime(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const scheduledTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    return scheduledTime;
  }

  private showNotification(): void {
    if (this.hasPermission) {
      const notification = new Notification('Daily Joy', {
        body: 'Time for your daily dose of positivity!',
        icon: '/icon.png',
        badge: '/badge.png'
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  }

  scheduleDaily(time: string): void {
    this.scheduleNotification({ 
      enabled: true,
      notificationTime: time,
      quietHours: {
        start: "22:00",
        end: "08:00"
      },
      channels: {
        dailyTips: true,
        achievements: true,
        streaks: true,
        compliments: true,
        moodTracking: true
      }
    });
  }

  cancelAll(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.getNotifications().then(notifications => {
          notifications.forEach(notification => notification.close());
        });
      });
    }
  }

  static scheduleDailyTip(time: string): void {
    const instance = NotificationService.getInstance();
    instance.scheduleNotification({
      enabled: true,
      notificationTime: time,
      quietHours: {
        start: "22:00",
        end: "08:00"
      },
      channels: {
        dailyTips: true,
        achievements: false,
        streaks: false,
        compliments: false,
        moodTracking: false
      }
    });
  }
}

export const notificationService = NotificationService.getInstance();