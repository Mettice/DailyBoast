export interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];

  trackEvent(eventName: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      eventName,
      properties,
      timestamp: new Date()
    };

    this.events.push(event);
    console.log('Analytics Event:', event); // For development

    // Implement your actual analytics tracking here
    // Example: mixpanel.track(eventName, properties);
  }

  getEvents(): AnalyticsEvent[] {
    return this.events;
  }
}

export const analyticsService = new AnalyticsService();
