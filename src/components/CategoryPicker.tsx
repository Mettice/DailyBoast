import { motion } from 'framer-motion';
import { 
  Star,          // Personal Growth
  GraduationCap, // Professional Growth
  MessageCircle, // Communication
  Wallet,        // Financial Wellness
  Users,         // Family
  Heart,         // Love
  Users2,        // Relationships
  Stethoscope,   // Health & Wellness
  HeartHandshake,// Self-care
  Trophy,        // Life Challenges
  Palette,       // Creativity
  Smile,         // Humor
  Brain          // Mindfulness
} from 'lucide-react';
import type { ComplimentCategory } from '../types';
import { useComplimentStore } from '../store/useComplimentStore';
import { categoryThemes } from '../config/categoryThemes';
import { useEffect, useState } from 'react';

const categories = [
  // Row 1
  { id: 'personal', label: 'Personal Growth', icon: Star },
  { id: 'professional', label: 'Professional Growth', icon: GraduationCap },
  { id: 'communication', label: 'Communication', icon: MessageCircle },
  { id: 'finance', label: 'Financial Wellness', icon: Wallet },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'love', label: 'Love', icon: Heart },
  // Row 2
  { id: 'relationships', label: 'Relationships', icon: Users2 },
  { id: 'health', label: 'Health & Wellness', icon: Stethoscope },
  { id: 'self-care', label: 'Self-care', icon: HeartHandshake },
  { id: 'life', label: 'Life Challenges', icon: Trophy },
  { id: 'creativity', label: 'Creativity', icon: Palette },
  { id: 'humor', label: 'Humor', icon: Smile },
  // Row 3 (centered)
  { id: 'mindfulness', label: 'Mindfulness & Spirituality', icon: Brain }
] as const;

export default function CategoryPicker() {
  const { selectedCategory, setCategory, selectedMood, handleGetCompliment } = useComplimentStore();
  const theme = categoryThemes[selectedCategory as keyof typeof categoryThemes];
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (theme) {
      document.body.style.background = `
        radial-gradient(
          circle 1200px at ${mousePosition.x}% ${mousePosition.y}%, 
          ${theme.background}15 0%,
          ${theme.background}10 40%,
          ${theme.background}05 60%,
          transparent 70%
        ),
        radial-gradient(
          circle 800px at ${mousePosition.x - 10}% ${mousePosition.y + 10}%, 
          ${theme.background}10 0%,
          transparent 60%
        ),
        #faf5ff
      `;
      document.body.style.transition = 'background 0.3s ease';
    }
    
    return () => {
      document.body.style.background = '#faf5ff';
    };
  }, [selectedCategory, theme, mousePosition]);

  const handleCategorySelect = async (category: ComplimentCategory) => {
    setCategory(category);
    if (selectedMood) {
      await handleGetCompliment();
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-6 gap-4 p-4">
        {categories.map(({ id, label, icon: Icon }) => {
          const theme = categoryThemes[id as keyof typeof categoryThemes] || {
            background: 'bg-purple-50',
            icon: 'text-purple-500'
          };
          return (
            <motion.button
              key={id}
              onClick={() => handleCategorySelect(id as ComplimentCategory)}
              className={`
                px-4 py-3 rounded-full text-sm font-medium
                flex items-center justify-center gap-2
                transition-all duration-200 relative
                ${selectedCategory === id ? `${theme.background} ${theme.icon}` : 'hover:bg-gray-100 text-gray-500'}
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="whitespace-nowrap">{label}</span>
              {selectedCategory === id && (
                <motion.div
                  layoutId="activeCategory"
                  className={`absolute inset-0 ${theme.background} rounded-full -z-10`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}