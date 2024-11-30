import React from 'react';
import { Globe2, Star, Brain, Target, Users, Heart, Trophy, Sparkles, CircleDot } from 'lucide-react';
import type { CategoryFilter, ComplimentCategory } from '../../types';
import { motion } from 'framer-motion';
import { categoryThemes } from '../../config/categoryThemes';

interface CategoryProps {
  selected: ComplimentCategory | null;
  onSelect: (category: CategoryFilter) => void;
}

export const Categories: React.FC<CategoryProps> = ({ selected, onSelect }) => {
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
    { id: 'creativity', label: 'Creativity', icon: Sparkles },
    { id: 'humor', label: 'Humor', icon: CircleDot }
  ] as const;

  return (
    <div className="relative">
      <motion.div 
        className="flex items-center justify-start gap-1.5 py-2 px-2 overflow-x-auto no-scrollbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {categories.map(({ id, label, icon: Icon }) => {
          const theme = categoryThemes[id as ComplimentCategory];
          return (
            <motion.button
              key={id}
              data-testid={`category-${id}`}
              onClick={() => onSelect(id as CategoryFilter)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-xs
                ${selected === id 
                  ? `${theme?.background || 'bg-purple-100'} ${theme?.primary || 'text-purple-700'}` 
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