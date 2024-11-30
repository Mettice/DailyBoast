import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Lock } from 'lucide-react';
import { useEngagementStore } from '../../store/useEngagementStore';
import type { Achievement } from '../../types/engagements';

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  const isUnlocked = !!achievement.unlockedAt;
  const progress = Math.min((achievement.progress / achievement.target) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative p-4 rounded-xl ${
        isUnlocked ? 'bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full ${
          isUnlocked ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-400'
        }`}>
          {isUnlocked ? <Trophy className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{achievement.title}</h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
          
          {/* Progress bar */}
          <div className="mt-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className={`h-full ${
                  isUnlocked ? 'bg-purple-500' : 'bg-gray-400'
                }`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {achievement.progress} / {achievement.target}
            </p>
          </div>
          
          {isUnlocked && (
            <p className="text-xs text-purple-600 mt-2">
              Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const AchievementsDisplay: React.FC = () => {
  const { achievements } = useEngagementStore();
  const [showAll, setShowAll] = React.useState(false);

  const unlockedCount = achievements.filter(a => a.unlockedAt).length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
        <p className="text-sm text-gray-600">
          {unlockedCount} / {achievements.length} unlocked
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {achievements
            .slice(0, showAll ? undefined : 4)
            .map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
        </AnimatePresence>
      </div>

      {achievements.length > 4 && (
        <motion.button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-2 text-center text-purple-600 hover:text-purple-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showAll ? 'Show Less' : 'Show All Achievements'}
        </motion.button>
      )}
    </div>
  );
};