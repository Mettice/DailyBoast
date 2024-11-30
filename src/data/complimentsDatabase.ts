import { ComplimentCategory, Language } from '../types';

interface MultilingualCompliment {
  id: string;
  translations: Record<Language, string>;
  category: ComplimentCategory;
  tags: string[];
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  theme?: 'normal' | 'festive' | 'professional' | 'casual';
  mood?: string[];
}

export const complimentsDatabase: MultilingualCompliment[] = [
  {
    id: 'gen-001',
    translations: {
      en: 'Your kindness makes the world a better place.',
      es: 'Tu amabilidad hace del mundo un lugar mejor.',
      fr: 'Ta gentillesse rend le monde meilleur.',
      de: 'Deine Freundlichkeit macht die Welt zu einem besseren Ort.',
      it: 'La tua gentilezza rende il mondo un posto migliore.',
      pt: 'Sua bondade faz do mundo um lugar melhor.',
      zh: '你的善良让世界变得更美好。',
      ja: 'あなたの優しさが世界をより良い場所にしています。',
      ko: '당신의 친절함이 세상을 더 나은 곳으로 만듭니다.'
    },
    category: 'general',
    tags: ['kindness', 'impact'],
    season: 'spring',
    theme: 'normal'
  },
  {
    id: 'conf-001',
    translations: {
      en: 'Your confidence inspires those around you to believe in themselves.',
      es: 'Tu confianza inspira a quienes te rodean a creer en sí mismos.',
      fr: 'Ta confiance inspire ceux qui t\'entourent à croire en eux.',
      de: 'Dein Selbstvertrauen inspiriert andere, an sich selbst zu glauben.',
      it: 'La tua sicurezza ispira chi ti circonda a credere in se stesso.',
      pt: 'Sua confiança inspira aqueles ao seu redor a acreditarem em si mesmos.',
      zh: '你的自信激励着周围的人相信自己。',
      ja: 'あなたの自信が周りの人々に自分を信じる勇気を与えています。',
      ko: '당신의 자신감은 주변 사람들이 자신을 믿게 만듭니다.'
    },
    category: 'confidence',
    tags: ['inspiration', 'leadership'],
    theme: 'professional'
  }
  // Add more compliments...
];

// Add seasonal themes
export const seasonalThemes = {
  spring: {
    colors: {
      primary: '#a8e6cf',
      secondary: '#dcedc1',
      accent: '#ffd3b6',
      background: 'from-green-50 to-yellow-50'
    },
    icons: ['🌸', '🌱', '🌷', '🦋'],
    complimentTags: ['growth', 'renewal', 'fresh']
  },
  summer: {
    colors: {
      primary: '#ff9a9e',
      secondary: '#fad0c4',
      accent: '#ffecd2',
      background: 'from-orange-50 to-red-50'
    },
    icons: ['☀️', '🌊', '🌴', '🍉'],
    complimentTags: ['energy', 'adventure', 'joy']
  },
  autumn: {
    colors: {
      primary: '#ffb347',
      secondary: '#ffcc33',
      accent: '#ff8c00',
      background: 'from-yellow-50 to-orange-50'
    },
    icons: ['🍁', '🍂', '🎃', '🌰'],
    complimentTags: ['change', 'wisdom', 'reflection']
  },
  winter: {
    colors: {
      primary: '#a1c4fd',
      secondary: '#c2e9fb',
      accent: '#e2ebf0',
      background: 'from-blue-50 to-indigo-50'
    },
    icons: ['❄️', '⛄', '🎄', '☃️'],
    complimentTags: ['peace', 'comfort', 'warmth']
  }
};