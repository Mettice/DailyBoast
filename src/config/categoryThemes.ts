import { ComplimentCategory } from '../types';

interface CategoryTheme {
  primary: string;
  secondary: string;
  background: string;
  gradient: string;
  lightBg: string;
  icon: string;
}

export const categoryThemes: Record<ComplimentCategory | 'all', CategoryTheme> = {
  all: {
    primary: 'text-purple-600',
    secondary: 'text-purple-500',
    background: 'bg-purple-100',
    gradient: 'from-purple-500 to-pink-500',
    lightBg: 'bg-purple-50',
    icon: 'text-purple-500'
  },
  general: {
    primary: 'text-blue-600',
    secondary: 'text-blue-500',
    background: 'bg-blue-100',
    gradient: 'from-blue-50 to-indigo-50',
    lightBg: 'bg-blue-50',
    icon: 'text-blue-500'
  },
  confidence: {
    primary: 'text-emerald-600',
    secondary: 'text-emerald-500',
    background: 'bg-emerald-100',
    gradient: 'from-emerald-50 to-teal-50',
    lightBg: 'bg-emerald-50',
    icon: 'text-emerald-500'
  },
  motivation: {
    primary: 'text-orange-600',
    secondary: 'text-orange-500',
    background: 'bg-orange-100',
    gradient: 'from-orange-50 to-yellow-50',
    lightBg: 'bg-orange-50',
    icon: 'text-orange-500'
  },
  friendship: {
    primary: 'text-pink-600',
    secondary: 'text-pink-500',
    background: 'bg-pink-100',
    gradient: 'from-pink-50 to-rose-50',
    lightBg: 'bg-pink-50',
    icon: 'text-pink-500'
  },
  'self-care': {
    primary: 'text-violet-600',
    secondary: 'text-violet-500',
    background: 'bg-violet-100',
    gradient: 'from-violet-50 to-purple-50',
    lightBg: 'bg-violet-50',
    icon: 'text-violet-500'
  },
  success: {
    primary: 'text-green-600',
    secondary: 'text-green-500',
    background: 'bg-green-100',
    gradient: 'from-green-50 to-emerald-50',
    lightBg: 'bg-green-50',
    icon: 'text-green-500'
  },
  creativity: {
    primary: 'text-amber-600',
    secondary: 'text-amber-500',
    background: 'bg-amber-100',
    gradient: 'from-amber-50 to-orange-50',
    lightBg: 'bg-amber-50',
    icon: 'text-amber-500'
  },
  humor: {
    primary: 'text-yellow-600',
    secondary: 'text-yellow-500',
    background: 'bg-yellow-100',
    gradient: 'from-yellow-50 to-amber-50',
    lightBg: 'bg-yellow-50',
    icon: 'text-yellow-500'
  },
  inspiration: {
    primary: 'text-indigo-600',
    secondary: 'text-indigo-500',
    background: 'bg-indigo-100',
    gradient: 'from-indigo-50 to-blue-50',
    lightBg: 'bg-indigo-50',
    icon: 'text-indigo-500'
  },
  personal: {
    primary: 'text-purple-600',
    secondary: 'text-purple-500',
    background: 'bg-purple-100',
    gradient: 'from-purple-500 to-pink-500',
    lightBg: 'bg-purple-50',
    icon: 'text-purple-500'
  },
  professional: {
    primary: 'text-purple-600',
    secondary: 'text-purple-500',
    background: 'bg-purple-100',
    gradient: 'from-purple-500 to-pink-500',
    lightBg: 'bg-purple-50',
    icon: 'text-purple-500'
  }
};

export type CategoryThemeType = typeof categoryThemes;