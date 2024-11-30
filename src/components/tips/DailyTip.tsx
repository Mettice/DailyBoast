import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Heart } from 'lucide-react';
import { useTipsStore } from '../../store/useTipsStore';
import { useComplimentStore } from '../../store/useComplimentStore';
import type { TipCategory } from '../../types/tips';
import { Tooltip } from '../ui/Tooltip';
import { ShareMenu } from '../sharing/ShareMenu';
import { ShareImage } from '../sharing/ShareImage';
import { useTheme } from '../../hooks/useTheme';
import { useProgress } from '../../hooks/useProgress';

export const categoryColors: Record<TipCategory, string> = {
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
  const { currentTheme } = useTheme();
  const { stats, updateProgress } = useProgress();

  React.useEffect(() => {
    if (!currentTip) {
      fetchNewTip('mindfulness', selectedMood || undefined);
    }
  }, []);

  React.useEffect(() => {
    if (currentTip) {
      updateProgress('view', currentTip);
    }
  }, [currentTip]);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await fetchNewTip(currentTip?.category || 'mindfulness', selectedMood || undefined);
    } finally {
      setIsLoading(false);
    }
  };


  const handleCategoryChange = async (newCategory: TipCategory) => {
    setIsLoading(true);
    try {
      await fetchNewTip(newCategory, selectedMood || undefined);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentTip?.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-md mt-4 sm:mt-6 mx-4 sm:mx-auto max-w-xl"
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
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-8">
          {Object.keys(categoryColors).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category as TipCategory)}
              className={`
                px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
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
        <motion.p 
          layout
          className="text-base sm:text-lg text-gray-700 text-center my-4 sm:my-8 leading-relaxed px-2 sm:px-4"
        >
          {isLoading ? "Loading..." : currentTip?.text || "No tip available"}
        </motion.p>

        {/* Add this after your main tip content */}
        <motion.div 
          className="mt-4 text-sm text-gray-600 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Activity */}
            <motion.div 
              className="bg-blue-50 p-3 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-medium">📚 Activity</p>
              <p className="text-lg">{stats.totalTipsViewed} viewed</p>
              <p className="text-xs text-blue-600">{stats.totalTipsSaved} saved</p>
            </motion.div>

            {/* Categories */}
            <motion.div 
              className="bg-green-50 p-3 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-medium">🎯 Categories</p>
              <p className="text-lg">{stats.categoriesExplored.length} explored</p>
              {stats.favoriteCategory && (
                <p className="text-xs text-green-600">
                  Favorite: {stats.favoriteCategory.name}
                </p>
              )}
            </motion.div>

            {/* Sharing */}
            <motion.div 
              className="bg-pink-50 p-3 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-medium">💝 Sharing</p>
              <p className="text-lg">{stats.tipsShared} shared</p>
              <p className="text-xs text-pink-600">Keep spreading joy!</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          layout
          className="flex justify-center gap-3 sm:gap-6 mt-4 sm:mt-8"
        >
          <Tooltip content="Get new tip">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 sm:p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </Tooltip>

          <Tooltip content="Save tip">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => currentTip && saveTip(currentTip)}
              className="p-2 sm:p-3 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </Tooltip>

          {currentTip && (
            <ShareMenu 
              compliment={currentTip}
              onShare={() => updateProgress('share', currentTip)}
              renderContent={() => (
                <ShareImage 
                  compliment={currentTip} 
                  theme={currentTheme}
                />
              )}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};