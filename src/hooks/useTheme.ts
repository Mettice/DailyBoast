import { useState } from 'react';
import { Theme, themes } from '../config/themes';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(prev => prev.id === 'light' ? themes.dark : themes.light);
  };

  return { currentTheme, toggleTheme };
}; 