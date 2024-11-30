import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Trophy } from 'lucide-react';
import type { Achievement } from '../../data/compliments';

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const progress = (achievement.progress! / achievement.target!) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl p-4 shadow-sm ${
        achievement.isUnlocked ? 'border-2 border-purple-200' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full ${
          achievement.isUnlocked 
            ? 'bg-purple-100 text-purple-600' 
            : 'bg-gray-100 text-gray-400'
        }`}>
          {achievement.isUnlocked ? (
            <Trophy className="w-6 h-6" />
          ) : (
            <Lock className="w-6 h-6" />
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{achievement.title}</h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className={`h-full ${
                  achievement.isUnlocked ? 'bg-purple-500' : 'bg-gray-300'
                }`}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {achievement.progress} / {achievement.target}
            </p>
          </div>

          {achievement.unlockedAt && (
            <p className="text-xs text-purple-600 mt-2">
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};