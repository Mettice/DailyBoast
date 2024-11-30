import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Share2 } from 'lucide-react';
import { useTipsStore } from '../../store/useTipsStore';
import { Tooltip } from '../ui/Tooltip';
import { categoryColors } from './DailyTip';

export const SavedTips: React.FC = () => {
  const { savedTips, removeSavedTip } = useTipsStore();

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Tip',
          text
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (savedTips.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No saved tips yet. Save tips you like by clicking the heart icon!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {savedTips.map((tip) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm"
          >
            <p className="text-gray-700 mb-3">{tip.text}</p>
            <div className="flex justify-between items-center">
              <span className={`text-sm px-2 py-1 rounded-full ${categoryColors[tip.category]}`}>
                {tip.category}
              </span>
              <div className="flex gap-2">
                <Tooltip content="Share tip">
                  <button
                    onClick={() => handleShare(tip.text)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </Tooltip>
                <Tooltip content="Remove from saved">
                  <button
                    onClick={() => removeSavedTip(tip.id)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </Tooltip>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}; 