import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Lock, Star } from 'lucide-react';
import { useEngagementStore } from '../../store/useEngagementStore';
import type { Achievement } from '../../types/engagements';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const isUnlocked = !!achievement.unlockedAt;
  const progress = Math.min((achievement.progress / achievement.target) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl p-4 shadow-sm ${
        isUnlocked ? 'border border-purple-100' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-lg ${
          isUnlocked 
            ? 'bg-purple-50 text-purple-600' 
            : 'bg-gray-50 text-gray-400'
        }`}>
          {isUnlocked ? (
            <Trophy className="w-5 h-5" />
          ) : (
            <Lock className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm">{achievement.title}</h3>
          <p className="text-xs text-gray-600 mt-0.5">{achievement.description}</p>

          {/* Progress bar */}
          <div className="mt-2">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  isUnlocked ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                {achievement.progress} / {achievement.target}
              </p>
              {isUnlocked && (
                <p className="text-xs text-purple-600">
                  {new Date(achievement.unlockedAt!).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const AchievementsDisplay: React.FC = () => {
  const { achievements } = useEngagementStore();
  const [showAll, setShowAll] = React.useState(false);

  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  const displayedAchievements = showAll ? achievements : achievements.slice(0, 4);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-medium text-gray-900">Achievements</h2>
        </div>
        <span className="text-sm text-gray-500">
          {unlockedCount} / {achievements.length}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <AnimatePresence>
          {displayedAchievements.map(achievement => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
            />
          ))}
        </AnimatePresence>
      </div>

      {achievements.length > 4 && (
        <motion.button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-2 text-sm text-purple-600 hover:text-purple-700 
                     hover:bg-purple-50 rounded-lg transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {showAll ? '← Show Less' : 'Show All Achievements →'}
        </motion.button>
      )}
    </div>
  );
}; 