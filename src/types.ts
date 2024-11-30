export type MoodType = 
  | 'energetic'
  | 'peaceful'
  | 'happy'
  | 'sad'
  | 'tired'
  | 'anxious'
  | 'motivated'
  | 'stressed'
  | 'focused'
  | 'angry'
  | 'grateful'
  | 'excited'
  | 'content'
  | 'bored'
  | 'neutral'
  | 'depressed'
  | 'lonely'
  | 'confused'
  | 'disheartened'
  | 'frustrated';

export type ComplimentCategory = 'all' | 'personal' | 'professional' | 'general' | 'confidence' | 
  'motivation' | 'friendship' | 'self-care' | 'success' | 'creativity' | 'humor';

export interface Compliment {
  id: string;
  text: string;
  category: ComplimentCategory;
  mood: MoodType;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
} 

export type { TipCategory } from './types/tips';