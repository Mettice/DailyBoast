export type TipCategory = 
  | 'health'
  | 'mindfulness'
  | 'productivity'
  | 'exercise'
  | 'nutrition'
  | 'mental-health'
  | 'sleep'
  | 'self-care'
  | 'digital-detox'
  | 'hygiene'
  | 'relationships'
  | 'work'
  | 'social'
  | 'emotional'
  | 'leisure'
  | 'personal';

export interface Tip {
  id: string;
  category: TipCategory;
  text: string;
  tags?: string[];
  source?: string;
}

export interface DailyTipState {
  currentTip: Tip | null;
  lastUpdated: string;
  savedTips: Tip[];
}

export const TIP_CATEGORIES = [
  'health',
  'mindfulness',
  'productivity',
  'exercise',
  'nutrition',
  'mental-health',
  'sleep',
  'self-care',
  'digital-detox',
  'hygiene',
  'relationships',
  'work',
  'social',
  'emotional',
  'leisure',
  'personal'
] as const;