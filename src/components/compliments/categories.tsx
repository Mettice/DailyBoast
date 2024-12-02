import React from 'react';
import { Globe2, Star, Brain, Target, Users, Heart, Trophy, Sparkles, CircleDot, PiggyBank, MessageCircle } from 'lucide-react';
import type { CategoryFilter, ComplimentCategory } from '../../types';
import { motion } from 'framer-motion';
import { categoryThemes } from '../../config/categoryThemes';

interface CategoryProps {
  selected: ComplimentCategory | null;
  onSelect: (category: CategoryFilter) => void;
}

export const Categories: React.FC<CategoryProps> = ({ selected, onSelect }) => {
  const categories = [
    { id: 'personal', label: 'Personal Growth', icon: Star },
    { id: 'professional', label: 'Professional Life', icon: Brain },
    { id: 'communication', label: 'Communication', icon: MessageCircle },
    { id: 'financial', label: 'Financial Wellness', icon: PiggyBank },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'love', label: 'Love', icon: Heart },
    { id: 'relationships', label: 'Relationships', icon: Target },
    { id: 'health', label: 'Health & Wellness', icon: Brain },
    { id: 'self-care', label: 'Self-care', icon: Heart },
    { id: 'life', label: 'Life Challenges', icon: Trophy },
    { id: 'creativity', label: 'Creativity', icon: Sparkles },
    { id: 'humor', label: 'Humor & Positivity', icon: CircleDot },
    { id: 'mindfulness', label: 'Mindfulness & Spirituality', icon: Brain },
    
  ] as const;

  return (
    <div className="relative">
      <motion.div 
        className="flex items-center justify-start gap-1.5 py-2 px-2 overflow-x-auto no-scrollbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {categories.map(({ id, label, icon: Icon }) => {
          const theme = categoryThemes[id as keyof typeof categoryThemes];
          return (
            <motion.button
              key={id}
              data-testid={`category-${id}`}
              onClick={() => onSelect(id as CategoryFilter)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-xs
                ${selected === id 
                  ? `${theme?.background || 'bg-purple-100'} ${theme?.icon || 'text-purple-700'}` 
                  : 'hover:bg-gray-100/50 text-gray-600'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`w-3.5 h-3.5 ${selected === id ? theme?.icon || 'text-purple-500' : 'text-gray-500'}`} />
              <span className="font-medium whitespace-nowrap">{label}</span>
              {selected === id && (
                <motion.div
                  layoutId="activeCategory"
                  className={`absolute inset-0 ${theme?.background || 'bg-purple-100'} rounded-full -z-10`}
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
};