import React from 'react';
import { Flame, Trophy, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEngagementStore } from '../../store/useEngagementStore';

export const StreakDisplay: React.FC = () => {
  const { streak } = useEngagementStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 shadow-sm"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-100 rounded-full">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Streak</p>
            <p className="text-xl font-bold text-gray-900">{streak.currentStreak} days</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-full">
            <Trophy className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Best Streak</p>
            <p className="text-xl font-bold text-gray-900">{streak.longestStreak} days</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-full">
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Member Since</p>
            <p className="text-xl font-bold text-gray-900">
              {new Date(streak.startDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};