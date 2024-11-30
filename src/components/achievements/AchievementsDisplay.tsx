import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trophy } from 'lucide-react';
import { AchievementCard } from './AchievementsCard';
import { useAchievements } from '../../hooks/useAchievements.ts';



export const AchievementsDisplay: React.FC = () => {
  const { achievements, level, totalUnlocked } = useAchievements();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const displayedAchievements = isExpanded 
    ? achievements 
    : achievements.slice(0, 4);

  return (
    <div className="space-y-4">
      {/* Level Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            <div>
              <h2 className="text-lg font-semibold">Level {level}</h2>
              <p className="text-sm opacity-90">
                {totalUnlocked} / {achievements.length} Achievements Unlocked
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {displayedAchievements.map((achievement) => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
            />
          ))}
        </AnimatePresence>
      </div>

      {achievements.length > 4 && (
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 text-center text-purple-600 hover:text-purple-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-center gap-2">
            <span>{isExpanded ? 'Show Less' : 'Show All Achievements'}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.button>
      )}
    </div>
  );
};