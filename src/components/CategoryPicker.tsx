import { motion } from 'framer-motion';
import { Sparkles, Heart, Trophy, Users, Smile, Star, Palette, Brain, Target, Globe2, CircleDot } from 'lucide-react';
import type { ComplimentCategory } from '../types';
import { useComplimentStore } from '../store/useComplimentStore';
import { categoryThemes } from '../config/categoryThemes';

const categories = [
  { id: 'all', label: 'All', icon: Globe2 },
  { id: 'personal', label: 'Personal', icon: Star },
  { id: 'professional', label: 'Professional', icon: Brain },
  { id: 'general', label: 'General', icon: Star },
  { id: 'confidence', label: 'Confidence', icon: Brain },
  { id: 'motivation', label: 'Motivation', icon: Target },
  { id: 'friendship', label: 'Friendship', icon: Users },
  { id: 'self-care', label: 'Self-care', icon: Heart },
  { id: 'success', label: 'Success', icon: Trophy },
  { id: 'creativity', label: 'Creativity', icon: Palette },
  { id: 'humor', label: 'Humor', icon: CircleDot }
] as const;

export default function CategoryPicker() {
  const { selectedCategory, setCategory, selectedMood, handleGetCompliment } = useComplimentStore();

  const handleCategorySelect = async (category: ComplimentCategory) => {
    setCategory(category);
    if (selectedMood) {
      await handleGetCompliment();
    }
  };

  return (
    <div className="relative">
      <motion.div 
        className="flex items-center gap-2 overflow-x-auto pb-4 px-4 no-scrollbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {categories.map(({ id, label, icon: Icon }) => {
          const theme = categoryThemes[id as ComplimentCategory];
          return (
            <motion.button
              key={id}
              onClick={() => handleCategorySelect(id as ComplimentCategory)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all
                ${selectedCategory === id 
                  ? `${theme.background} ${theme.primary}`
                  : 'hover:bg-gray-100/50 text-gray-600'}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`w-4 h-4 ${selectedCategory === id ? theme.icon : 'text-gray-500'}`} />
              <span className="text-sm font-medium">{label}</span>
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
      </motion.div>
    </div>
  );
}