export type ComplimentCategory = 
'general' | 'confidence' | 'motivation' | 'friendship' | 'self-care' | 'success' | 'creativity' | 'professional' | 'personal' | 'humor' | 'family';

export interface Compliment {
  id: string;
  text: string;
  category: ComplimentCategory;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const compliments: Compliment[] = [

  // Professional
  { id: '15', text: "You're a true professional!", category: 'professional', tags: ['skill'] , createdAt: new Date(), updatedAt: new Date()},
  { id: '16', text: "Your professionalism is unmatched!", category: 'professional', tags: ['skill'] , createdAt: new Date(), updatedAt: new Date()},
  { id: '151', text: "Your dedication to excellence makes you stand out in everything you do.", category: 'professional', tags: ['excellence', 'dedication'], createdAt: new Date(), updatedAt: new Date()},

  // Personal
  { id: '17', text: "You're amazing!", category: 'personal', tags: ['general'], createdAt: new Date(), updatedAt: new Date()},
  { id: '18', text: "Your authenticity shines through in everything you do.", category: 'personal', tags: ['authenticity'], createdAt: new Date(), updatedAt: new Date()},
  { id: '181', text: "The way you stay true to yourself while lifting others up is truly inspiring.", category: 'personal', tags: ['inspiration', 'authenticity'], createdAt: new Date(), updatedAt: new Date()},
  
  // General
  { id: '1', text: "Your positivity is contagious!", category: 'general', tags: ['positivity'] , createdAt: new Date(), updatedAt: new Date()},
  { id: '2', text: "You bring out the best in others!", category: 'general', tags: ['impact'] , createdAt: new Date(), updatedAt: new Date()},
  
  // Confidence
  { id: '3', text: "You're capable of amazing things!", category: 'confidence', tags: ['potential'] , createdAt: new Date(), updatedAt: new Date()},
  { id: '4', text: "Your confidence inspires others.", category: 'confidence', tags: ['inspiration'] , createdAt: new Date(), updatedAt: new Date()},
  
  // Motivation
  { id: '5', text: "Every step you take is progress!", category: 'motivation', tags: ['progress'] , createdAt: new Date(), updatedAt: new Date()},
  { id: '6', text: "You're making it happen!", category: 'motivation', tags: ['achievement'] , createdAt: new Date(), updatedAt: new Date()},
  
  // Friendship
  { id: '7', text: "You're the friend everyone wishes they had.", category: 'friendship', tags: ['support'] , createdAt: new Date(), updatedAt: new Date()},
  { id: '8', text: "Your friendship means the world.", category: 'friendship', tags: ['gratitude'] , createdAt: new Date(), updatedAt: new Date()},
  
  // Self-care
  { id: '9', text: "Taking care of yourself shows wisdom.", category: 'self-care', tags: ['wellness'] , createdAt: new Date(), updatedAt: new Date()},
  { id: '10', text: "You deserve all the self-love.", category: 'self-care', tags: ['love'] , createdAt: new Date(), updatedAt: new Date()},

  // Success
  { id: '11', text: "Success looks good on you!", category: 'success', tags: ['achievement'] , createdAt: new Date(), updatedAt: new Date()},
  { id: '12', text: "You're crushing your goals!", category: 'success', tags: ['goals'] , createdAt: new Date(), updatedAt: new Date()},

  // Creativity
  { id: '13', text: "Your creativity knows no bounds!", category: 'creativity', tags: ['imagination'] , createdAt: new Date(), updatedAt: new Date()},
  { id: '14', text: "Your ideas are brilliant!", category: 'creativity', tags: ['innovation'] , createdAt: new Date(), updatedAt: new Date()},
];

export const getRandomCompliment = (category?: ComplimentCategory): Compliment => {
  let filtered = compliments;
  
  if (category) {
    filtered = filtered.filter(c => c.category === category);
  }
  
  if (filtered.length === 0) {
    return {
      ...compliments[Math.floor(Math.random() * compliments.length)],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
  
  return {
    ...filtered[Math.floor(Math.random() * filtered.length)],
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const getCategories = (): ComplimentCategory[] => {
  return Array.from(new Set(compliments.map(c => c.category)));
};

export const getComplimentById = (id: string): Compliment | undefined => {
  return compliments.find(c => c.id === id);
};

