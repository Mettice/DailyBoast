export type MoodType = 
  | 'energetic'
  | 'peaceful'
  | 'motivated'
  | 'tired'
  | 'focused'
  | 'happy'
  | 'sad'
  | 'anxious'
  | 'stressed'
  | 'angry'
  | 'frustrated'
  | 'depressed'
  | 'lonely'
  | 'bored'
  | 'confused'
  | 'disheartened'
  | 'neutral'
  | 'grateful'
  | 'excited'
  | 'content';

export interface MoodEntry {
  id: string;
  mood: MoodType;
  date: string;
  note?: string;
  category?: string;
  intensity?: number; // 1-5 scale
}

export interface MoodAnalytics {
  mostFrequentMood: string;
  improvementTrends: number;
  weeklyAverage: number;
  streakCount: number;
} 