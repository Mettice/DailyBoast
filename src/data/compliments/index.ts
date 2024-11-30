// Define the exact categories we want to use
export type Category = 
  | 'general'
  | 'confidence'
  | 'motivation'
  | 'friendship'
  | 'self-care'
  | 'success'
  | 'creativity'
  | 'all';

export interface Compliment {
  id: string;
  text: string;
  category: Category;
  tags: string[];
}

export const compliments: Compliment[] = [
  // General
  {
    id: 'gen1',
    text: "Your positivity is contagious!",
    category: 'general',
    tags: ['positivity', 'energy']
  },
  {
    id: 'gen2',
    text: "You make the world a better place just by being in it.",
    category: 'general',
    tags: ['kindness', 'impact']
  },

  // Confidence
  {
    id: 'conf1',
    text: "You're capable of amazing things!",
    category: 'confidence',
    tags: ['belief', 'potential']
  },
  {
    id: 'conf2',
    text: "Your confidence is inspiring to everyone around you!",
    category: 'confidence',
    tags: ['inspiration', 'leadership']
  },

  // Motivation
  {
    id: 'mot1',
    text: "Every challenge you face makes you stronger!",
    category: 'motivation',
    tags: ['strength', 'growth']
  },
  {
    id: 'mot2',
    text: "Your determination is unstoppable!",
    category: 'motivation',
    tags: ['determination', 'persistence']
  },
  {
    id: 'mot3',
    text: "You're making progress every single day!",
    category: 'motivation',
    tags: ['progress', 'achievement']
  },

  // Friendship
  {
    id: 'fr1',
    text: "You're the friend everyone wishes they had!",
    category: 'friendship',
    tags: ['loyalty', 'support']
  },
  {
    id: 'fr2',
    text: "Your friendship means the world to those around you!",
    category: 'friendship',
    tags: ['caring', 'friendship']
  },
  {
    id: 'fr3',
    text: "You have a gift for making people feel valued and heard!",
    category: 'friendship',
    tags: ['empathy', 'understanding']
  },

  // Self-care
  {
    id: 'sc1',
    text: "Remember to take care of yourself today - you deserve it!",
    category: 'self-care',
    tags: ['self-love', 'wellness']
  },
  {
    id: 'sc2',
    text: "Your well-being matters, take time for yourself today!",
    category: 'self-care',
    tags: ['wellness', 'mindfulness']
  },
  {
    id: 'sc3',
    text: "It's okay to prioritize your own happiness!",
    category: 'self-care',
    tags: ['happiness', 'self-care']
  },

  // Success
  {
    id: 'suc1',
    text: "Your hard work is paying off in amazing ways!",
    category: 'success',
    tags: ['achievement', 'recognition']
  },
  {
    id: 'suc2',
    text: "Success looks natural on you - keep shining!",
    category: 'success',
    tags: ['achievement', 'excellence']
  },
  {
    id: 'suc3',
    text: "You're achieving great things through your dedication!",
    category: 'success',
    tags: ['dedication', 'achievement']
  },

  // Creativity
  {
    id: 'cr1',
    text: "Your creativity knows no bounds!",
    category: 'creativity',
    tags: ['imagination', 'innovation']
  },
  {
    id: 'cr2',
    text: "Your unique perspective brings beauty to the world!",
    category: 'creativity',
    tags: ['uniqueness', 'inspiration']
  },
  {
    id: 'cr3',
    text: "Your creative spirit lights up everything around you!",
    category: 'creativity',
    tags: ['spirit', 'inspiration']
  }
];

export const getRandomCompliment = (category?: string): Compliment => {
  let filtered = compliments;
  
  if (category && category !== 'all') {
    filtered = filtered.filter(c => c.category === category);
  }
  
  if (filtered.length === 0) {
    console.warn(`No compliments found for category: ${category}`);
    return compliments[Math.floor(Math.random() * compliments.length)];
  }
  
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export const getCategoryCounts = () => {
  return compliments.reduce((acc, compliment) => {
    acc[compliment.category] = (acc[compliment.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getAllCategories = (): Category[] => {
  return ['all', 'general', 'confidence', 'motivation', 'friendship', 'self-care', 'success', 'creativity'];
};

export enum TipCategory {
  Productivity = 'Productivity',
  Wellness = 'Wellness',
  Learning = 'Learning',
  Career = 'Career',
}

export interface UserPreferences {
  channels: {
    dailyTips: boolean;
    achievements: boolean;
    streaks: boolean;
  };
  favoriteCategories?: TipCategory[];
  notificationFrequency?: string;
}

export interface UserProfile {
  preferences: UserPreferences;
  // ... other user profile fields
}

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'milestone';
  category: string;
  progress?: number;
  target?: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
};

