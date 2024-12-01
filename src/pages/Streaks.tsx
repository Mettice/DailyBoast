import React from 'react';
import { motion } from 'framer-motion';
import { StreakDisplay } from '../components/engagement/StreakDisplay';
import { Calendar } from 'lucide-react';

export const Streaks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-purple-600" />
        <h1 className="text-2xl font-bold text-purple-900">Your Streaks</h1>
      </div>
      
      <StreakDisplay />
      
      {/* Additional streak statistics or history could go here */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-purple-800 mb-4">Streak History</h2>
        {/* Add streak history visualization here */}
      </div>
    </motion.div>
  );
}; 