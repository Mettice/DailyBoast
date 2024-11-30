import { Tip, TipCategory } from '../types/tips';

export const tips: Tip[] = [
  // Health Tips
  {
    id: 'health-1',
    category: 'health',
    text: "Drink a glass of water first thing in the morning to kickstart your metabolism and stay hydrated throughout the day.",
    tags: ['hydration', 'morning-routine']
  },
  {
    id: 'health-2',
    category: 'health',
    text: "Take a 5-minute stretching break every 2 hours to improve circulation and reduce muscle tension.",
    tags: ['exercise', 'wellness']
  },

  // Mindfulness Tips
  {
    id: 'mindfulness-1',
    category: 'mindfulness',
    text: "Take 5 minutes to focus on your breathing. Inhale deeply, hold, and exhale slowly. This can help reduce stress and improve focus.",
    tags: ['meditation', 'stress-relief']
  },
  {
    id: 'mindfulness-2',
    category: 'mindfulness',
    text: "Practice the 5-4-3-2-1 method: Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste.",
    tags: ['grounding', 'anxiety-relief']
  },

  // Productivity Tips
  {
    id: 'productivity-1',
    category: 'productivity',
    text: "Start your day by writing down your top 3 priorities. Focus on completing these tasks before moving on to less important tasks.",
    tags: ['planning', 'time-management']
  },
  {
    id: 'productivity-2',
    category: 'productivity',
    text: "Use the Pomodoro Technique: Work for 25 minutes, then take a 5-minute break to maintain focus and productivity.",
    tags: ['time-management', 'focus']
  },

  // Mental Health Tips
  {
    id: 'mental-health-1',
    category: 'mental-health',
    text: "Practice self-compassion by treating yourself with the same kindness you'd show a good friend.",
    tags: ['self-compassion', 'wellness']
  },
  {
    id: 'mental-health-2',
    category: 'mental-health',
    text: "Write down three things you're grateful for today, no matter how small they might seem.",
    tags: ['gratitude', 'positivity']
  },

  // Sleep Tips
  {
    id: 'sleep-1',
    category: 'sleep',
    text: "Create a relaxing bedtime routine: dim the lights, avoid screens, and try light stretching 30 minutes before bed.",
    tags: ['sleep-hygiene', 'routine']
  },

  // Digital Detox Tips
  {
    id: 'digital-detox-1',
    category: 'digital-detox',
    text: "Designate specific 'no-phone zones' in your home, like the dining table or bedroom.",
    tags: ['technology', 'boundaries']
  },

  // Relationships Tips
  {
    id: 'relationships-1',
    category: 'relationships',
    text: "Practice active listening today: focus fully on what others are saying without planning your response.",
    tags: ['communication', 'empathy']
  },

  // Self-Care Tips
  {
    id: 'self-care-1',
    category: 'self-care',
    text: "Take a moment to check in with yourself today. How are you really feeling?",
    tags: ['awareness', 'emotional-health']
  },

  // Work Tips
  {
    id: 'work-1',
    category: 'work',
    text: "Apply the 'two-minute rule': if a task takes less than two minutes, do it now instead of putting it off.",
    tags: ['productivity', 'time-management']
  },

  // Hygiene Tips
  {
    id: 'hygiene-1',
    category: 'hygiene',
    text: "Create a morning self-care routine that makes you feel fresh and energized for the day ahead.",
    tags: ['self-care', 'routine']
  },

  // Exercise Tips
  {
    id: 'exercise-1',
    category: 'exercise',
    text: "Start small: even a 10-minute walk can boost your mood and energy levels.",
    tags: ['movement', 'wellness']
  },

  // Nutrition Tips
  {
    id: 'nutrition-1',
    category: 'nutrition',
    text: "Try the rainbow challenge: eat fruits or vegetables of different colors today for varied nutrients.",
    tags: ['healthy-eating', 'wellness']
  }
];

export const getRandomTip = (category?: TipCategory): Tip => {
  console.log('Getting random tip, requested category:', category);
  
  if (category) {
    // If specific category requested, filter for that category
    const categoryTips = tips.filter(tip => tip.category === category);
    console.log(`Tips for category ${category}:`, categoryTips);
    
    if (categoryTips.length === 0) {
      console.warn(`No tips found for category: ${category}`);
      return tips[Math.floor(Math.random() * tips.length)];
    }
    
    return categoryTips[Math.floor(Math.random() * categoryTips.length)];
  } else {
    // If no category specified, get a completely random tip
    const randomIndex = Math.floor(Math.random() * tips.length);
    console.log('Selected random tip:', tips[randomIndex]);
    return tips[randomIndex];
  }
};

export const getTipsByCategory = (category: TipCategory): Tip[] => {
  return tips.filter(tip => tip.category === category);
};

// Add this check at the end of the file
const categoriesInTips = new Set(tips.map(tip => tip.category));
console.log('Available categories in tips:', Array.from(categoriesInTips));