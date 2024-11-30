import React from 'react';
import { Sun, Moon, Star, Coffee, Target, Smile, Frown, AlertCircle, XCircle, Heart, Eye, Circle, HeartCrack } from 'lucide-react';
import { useComplimentStore } from "../store/useComplimentStore";
import { useAnalytics } from "../components/analytics/AnalyticsProvider";
import type { MoodType } from '../types';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';

const moods = [
  { id: 'energetic' as MoodType, icon: Sun, label: 'Energetic' },
  { id: 'peaceful' as MoodType, icon: Moon, label: 'Peaceful' },
  { id: 'happy' as MoodType, icon: Smile, label: 'Happy' },
  { id: 'sad' as MoodType, icon: Frown, label: 'Sad' },
  { id: 'tired' as MoodType, icon: Coffee, label: 'Tired' },
  { id: 'anxious' as MoodType, icon: AlertCircle, label: 'Anxious' },
  { id: 'grateful' as MoodType, icon: Heart, label: 'Grateful' },
  { id: 'motivated' as MoodType, icon: Target, label: 'Motivated' },
  { id: 'focused' as MoodType, icon: Eye, label: 'Focused' },
  { id: 'confused' as MoodType, icon: XCircle, label: 'Confused' },
  { id: 'disheartened' as MoodType, icon: Frown, label: 'Disheartened' },
  { id: 'neutral' as MoodType, icon: Circle, label: 'Neutral' },
  { id: 'bored' as MoodType, icon: Frown, label: 'Bored' },
  { id: 'lonely' as MoodType, icon: HeartCrack, label: 'Lonely' },
  { id: 'excited' as MoodType, icon: Smile, label: 'Excited' }
];

export const MoodSelector: React.FC = () => {
  const { selectedMood, setMood, handleGetCompliment, selectedCategory } = useComplimentStore();
  const { trackMoodSelected } = useAnalytics();
  const { updateProgress } = useProgress();

  const handleMoodSelect = async (mood: MoodType) => {
    console.log('Mood selected:', mood);
    setMood(mood);
    trackMoodSelected(mood);
    try {
      updateProgress('mood', mood, 'mood');
      console.log('Mood progress updated');
    } catch (error) {
      console.error('Error updating mood progress:', error);
    }
    if (selectedCategory) {
      await handleGetCompliment();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto px-4 sm:px-0 mb-6 sm:mb-8"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
        How are you feeling?
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
        {moods.map(({ id, icon: Icon, label }) => (
          <motion.button
            key={id}
            onClick={() => handleMoodSelect(id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl
              transition-all duration-200
              ${selectedMood === id 
                ? 'bg-purple-100 text-purple-600 ring-2 ring-purple-200 ring-offset-2 shadow-sm' 
                : 'bg-white/80 hover:bg-white hover:shadow-sm text-gray-600'
              }
            `}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm font-medium line-clamp-1">
              {label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};