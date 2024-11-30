import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import type { Achievement } from '../../types/engagements';

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  onClose,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 max-w-sm"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-yellow-100 rounded-full">
          <Trophy className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Achievement Unlocked!</h3>
          <p className="text-sm text-gray-600">{achievement.title}</p>
          <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
        </div>
      </div>
    </motion.div>
  );
};