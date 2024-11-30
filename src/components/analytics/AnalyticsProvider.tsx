import React, { createContext, useContext, useCallback } from 'react';
import type { MoodType, TipCategory } from '../../types';

interface AnalyticsContextType {
  trackMoodSelected: (mood: MoodType) => void;
  trackTipViewed: (category: TipCategory, mood?: MoodType) => void;
  trackTipShared: (tipId: string) => void;
  trackTipSaved: (tipId: string) => void;
  trackEvent: (event: string, data?: any) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const trackMoodSelected = useCallback((mood: MoodType) => {
    try {
      console.log('Mood selected:', mood);
      // Add your analytics implementation here
    } catch (error) {
      console.error('Error tracking mood:', error);
    }
  }, []);

  const trackTipViewed = useCallback((category: TipCategory, mood?: MoodType) => {
    try {
      console.log('Tip viewed:', { category, mood });
      // Add your analytics implementation here
    } catch (error) {
      console.error('Error tracking tip view:', error);
    }
  }, []);

  const trackTipShared = useCallback((tipId: string) => {
    try {
      console.log('Tip shared:', tipId);
      // Add your analytics implementation here
    } catch (error) {
      console.error('Error tracking tip share:', error);
    }
  }, []);

  const trackTipSaved = useCallback((tipId: string) => {
    try {
      console.log('Tip saved:', tipId);
      // Add your analytics implementation here
    } catch (error) {
      console.error('Error tracking tip save:', error);
    }
  }, []);

  const trackEvent = useCallback((event: string, data?: any) => {
    try {
      console.log('Event tracked:', event, data);
      // Add your analytics implementation here
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, []);

  return (
    <AnalyticsContext.Provider value={{
      trackMoodSelected,
      trackTipViewed,
      trackTipShared,
      trackTipSaved,
      trackEvent,
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
