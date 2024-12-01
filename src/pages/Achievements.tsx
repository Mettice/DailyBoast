import React from 'react';
import { AchievementsDisplay } from '../components/achievements/AchievementsDisplay';
import { motion } from 'framer-motion';

export const Achievements = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-purple-900">Your Achievements</h1>
      <AchievementsDisplay />
    </motion.div>
  );
}; 