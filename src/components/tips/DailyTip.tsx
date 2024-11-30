import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Share2, Heart } from 'lucide-react';
import { useTipsStore } from '../../store/useTipsStore';
import { useComplimentStore } from '../../store/useComplimentStore';
import type { TipCategory } from '../../types/tips';
import { Tooltip } from '../ui/Tooltip';

const categoryColors: Record<TipCategory, string> = {
  mindfulness: 'bg-blue-100 text-blue-800',
  exercise: 'bg-green-100 text-green-800',
  social: 'bg-purple-100 text-purple-800',
  emotional: 'bg-pink-100 text-pink-800',
  health: 'bg-yellow-100 text-yellow-800',
  productivity: 'bg-indigo-100 text-indigo-800',
  nutrition: 'bg-orange-100 text-orange-800',
  'mental-health': 'bg-teal-100 text-teal-800',
  sleep: 'bg-violet-100 text-violet-800',
  relationships: 'bg-rose-100 text-rose-800',
  work: 'bg-cyan-100 text-cyan-800',
  leisure: 'bg-amber-100 text-amber-800',
  personal: 'bg-lime-100 text-lime-800',
  'self-care': 'bg-emerald-100 text-emerald-800',
  'digital-detox': 'bg-slate-100 text-slate-800',
  hygiene: 'bg-fuchsia-100 text-fuchsia-800'
};

export const DailyTip: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentTip, fetchNewTip, saveTip } = useTipsStore();
  const { selectedMood } = useComplimentStore();

  React.useEffect(() => {
    if (!currentTip) {
      fetchNewTip('mindfulness', selectedMood || undefined);
    }
  }, [selectedMood]);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await fetchNewTip(currentTip?.category || 'mindfulness', selectedMood || undefined);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (currentTip && navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Tip',
          text: currentTip.text
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  // Example: Ensure category is set based on user selection
  const handleCategoryChange = (newCategory: TipCategory) => {
    fetchNewTip(newCategory, selectedMood || undefined);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentTip?.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-md mt-6 max-w-xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-semibold text-gray-800">Daily Tip</span>
          {selectedMood && (
            <span className="text-sm px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
              {selectedMood} mood
            </span>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.keys(categoryColors).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category as TipCategory)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 hover:shadow-sm
                ${categoryColors[category as TipCategory]}
                ${currentTip?.category === category ? 'ring-2 ring-offset-2' : 'hover:opacity-90'}
              `}
            >
              {category.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Tip Content */}
        {currentTip ? (
          <motion.p layout className="text-lg text-gray-700 text-center my-8 leading-relaxed">
            {isLoading ? "Loading..." : currentTip.text}
          </motion.p>
        ) : (
          <motion.p className="text-center text-gray-500 my-8">
            Select a category to get your personalized tip
          </motion.p>
        )}

        {/* Action Buttons */}
        <motion.div layout className="flex justify-center gap-6 mt-8">
          <Tooltip content="Get new tip">
            <motion.button onClick={handleRefresh}>
              <RefreshCw className="w-6 h-6" />
            </motion.button>
          </Tooltip>
          <Tooltip content="Save tip">
            <motion.button onClick={() => currentTip && saveTip(currentTip)}>
              <Heart className="w-6 h-6" />
            </motion.button>
          </Tooltip>
          <Tooltip content="Share tip">
            <motion.button onClick={handleShare}>
              <Share2 className="w-6 h-6" />
            </motion.button>
          </Tooltip>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};