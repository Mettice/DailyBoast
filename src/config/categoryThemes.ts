import { ComplimentCategory } from '../types';

interface CategoryTheme {
  background: string;
  icon: string;
}

export const categoryThemes: Record<ComplimentCategory, CategoryTheme> = {
  personal: {
    background: '#3b82f6',
    icon: 'text-blue-600'
  },
  professional: {
    background: '#9333ea',
    icon: 'text-purple-600'
  },
  communication: {
    background: '#ec4899',
    icon: 'text-pink-600'
  },
  finance: {
    background: '#10b981',
    icon: 'text-emerald-600'
  },
  family: {
    background: '#f97316',
    icon: 'text-orange-600'
  },
  love: {
    background: '#ef4444',
    icon: 'text-red-600'
  },
  relationships: {
    background: '#6366f1',
    icon: 'text-indigo-600'
  },
  health: {
    background: '#14b8a6',
    icon: 'text-teal-600'
  },
  'self-care': {
    background: '#f43f5e',
    icon: 'text-rose-600'
  },
  life: {
    background: '#f59e0b',
    icon: 'text-amber-600'
  },
  creativity: {
    background: '#d946ef',
    icon: 'text-fuchsia-600'
  },
  humor: {
    background: '#eab308',
    icon: 'text-yellow-600'
  },
  mindfulness: {
    background: '#06b6d4',
    icon: 'text-cyan-600'
  }
} as const;

export type CategoryThemeType = typeof categoryThemes;