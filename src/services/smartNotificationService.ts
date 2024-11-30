import { NotificationType, UserActivity } from '../types';

interface TimeSlot {
  hour: number;
  engagement: number;
}

export class SmartNotificationService {
  private static readonly LEARNING_PERIOD_DAYS = 7;
  private static readonly MIN_HOURS_BETWEEN_NOTIFICATIONS = 4;

  static async analyzeUserActivity(activities: UserActivity[]): Promise<TimeSlot[]> {
    const hourlyEngagement: { [hour: number]: number } = {};
    
    // Initialize all hours
    for (let i = 0; i < 24; i++) {
      hourlyEngagement[i] = 0;
    }

    // Analyze recent activities
    const recentActivities = activities.filter(activity => {
      const activityDate = new Date(activity.timestamp);
      const daysAgo = (Date.now() - activityDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysAgo <= this.LEARNING_PERIOD_DAYS;
    });

    // Calculate engagement scores
    recentActivities.forEach(activity => {
      const hour = new Date(activity.timestamp).getHours();
      hourlyEngagement[hour] += this.getActivityWeight(activity.type);
    });

    // Convert to time slots
    return Object.entries(hourlyEngagement).map(([hour, engagement]) => ({
      hour: parseInt(hour),
      engagement
    })).sort((a, b) => b.engagement - a.engagement);
  }

  private static getActivityWeight(type: 'view' | 'interact' | 'share' | 'compliment' | 'interaction' | 'notification' | 'mood'): number {
    switch (type) {
      case 'view': return 1;
      case 'interact': 
      case 'interaction': return 2;
      case 'share': return 3;
      case 'compliment': return 2;
      case 'notification': return 1;
      case 'mood': return 2;
      default: return 0;
    }
  }

  static async suggestNotificationTime(
    timeSlots: TimeSlot[],
    quietHours: { start: string; end: string }
  ): Promise<Date> {
    const now = new Date();
    const quietStart = this.parseTime(quietHours.start);
    const quietEnd = this.parseTime(quietHours.end);

    // Filter out quiet hours and sort by engagement
    const availableSlots = timeSlots
      .filter(slot => {
        const slotHour = slot.hour;
        if (quietStart <= quietEnd) {
          return slotHour < quietStart || slotHour >= quietEnd;
        } else {
          return slotHour < quietStart && slotHour >= quietEnd;
        }
      })
      .sort((a, b) => b.engagement - a.engagement);

    if (availableSlots.length === 0) {
      // Fallback to first hour after quiet period
      return new Date(now.setHours(quietEnd, 0, 0, 0));
    }

    // Get the best time slot
    const bestSlot = availableSlots[0];
    const suggestedTime = new Date(now);
    suggestedTime.setHours(bestSlot.hour, 0, 0, 0);

    // If suggested time is in the past, schedule for tomorrow
    if (suggestedTime < now) {
      suggestedTime.setDate(suggestedTime.getDate() + 1);
    }

    return suggestedTime;
  }

  private static parseTime(timeString: string): number {
    const [hours] = timeString.split(':').map(Number);
    return hours;
  }

  static async scheduleSmartNotification(
    type: NotificationType,
    timeSlots: TimeSlot[],
    quietHours: { start: string; end: string }
  ): Promise<void> {
    const suggestedTime = await this.suggestNotificationTime(timeSlots, quietHours);
    const delay = suggestedTime.getTime() - Date.now();

    setTimeout(() => {
      this.sendNotification(type);
    }, delay);
  }

  private static async sendNotification(type: NotificationType): Promise<void> {
    // Your existing notification logic
  }
} 