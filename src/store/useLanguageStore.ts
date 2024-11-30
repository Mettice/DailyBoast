import { create } from 'zustand';
import type { Language } from '../types';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguage = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
})); 