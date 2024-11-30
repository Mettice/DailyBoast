declare global {
    interface Window {
      gtag: (...args: any[]) => void;
    }
  }
  
  export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, properties);
    } else {
      console.log('Analytics event:', eventName, properties);
    }
  };