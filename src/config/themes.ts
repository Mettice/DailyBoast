import { seasonalThemes } from '../data/complimentsDatabase';
import { useState } from 'react';

export interface Theme {
    id: string;
    name: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      cardBackground: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    borderRadius: string;
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
  }
  
  export const themes: Record<string, Theme> = {
    light: {
      id: 'light',
      name: 'Light',
      colors: {
        primary: '#8b5cf6',
        secondary: '#ec4899',
        accent: '#3b82f6',
        background: 'from-purple-50 to-pink-50',
        text: '#1f2937',
        cardBackground: '#ffffff'
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter'
      },
      borderRadius: 'rounded-2xl',
      shadows: {
        small: 'shadow-sm',
        medium: 'shadow',
        large: 'shadow-lg'
      }
    },
    dark: {
      id: 'dark',
      name: 'Dark',
      colors: {
        primary: '#a78bfa',
        secondary: '#f472b6',
        accent: '#60a5fa',
        background: 'from-gray-900 to-gray-800',
        text: '#f3f4f6',
        cardBackground: '#1f2937'
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter'
      },
      borderRadius: 'rounded-2xl',
      shadows: {
        small: 'shadow-sm',
        medium: 'shadow',
        large: 'shadow-lg'
      }
    },
    // Add more themes...
  };
  
  export const useTheme = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(themes.light);

    const toggleTheme = () => {
      setCurrentTheme(prev => prev.id === 'light' ? themes.dark : themes.light);
    };

    return { currentTheme, toggleTheme };
  };
  
  export const getSeasonalTheme = (season: string): Partial<Theme> => {
    const baseTheme = themes.light;
    const seasonalColors = seasonalThemes[season as keyof typeof seasonalThemes]?.colors;
  
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        ...seasonalColors
      }
    };
  };