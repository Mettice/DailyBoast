import { useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  timeToInteractive?: number;
}

export const usePerformance = (componentName?: string) => {
  const metricsRef = useRef<PerformanceMetrics | null>(null);
  const renderCount = useRef(0);

  const measurePerformance = useCallback(() => {
    if (window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      metricsRef.current = {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
      };

      // Log in development only
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${componentName || 'App'} Metrics:`, metricsRef.current);
      }
    }
  }, [componentName]);

  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Render] ${componentName || 'Component'} render #${renderCount.current}`);
    }

    window.addEventListener('load', measurePerformance);
    return () => window.removeEventListener('load', measurePerformance);
  }, [measurePerformance, componentName]);

  return {
    metrics: metricsRef.current,
    renderCount: renderCount.current
  };
};