import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useEngagementStore } from '../store/useEngagementStore';

export const History = () => {
  const { stats } = useEngagementStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-purple-600" />
        <h1 className="text-2xl font-bold text-purple-900">Your History</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-purple-800">Total Tips</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {stats.totalCompliments}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-purple-800">Tips Shared</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {stats.complimentsShared}
          </p>
        </div>
      </div>
    </motion.div>
  );
}; 