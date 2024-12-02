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

export type ComplimentCategory = 
  | 'personal'
  | 'professional'
  | 'communication'
  | 'financial'
  | 'family'
  | 'love'
  | 'relationships'
  | 'health'
  | 'self-care'
  | 'life'
  | 'creativity'
  | 'humor'
  | 'mindfulness';

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