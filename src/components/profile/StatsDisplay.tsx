import React from 'react';
import { UserProfile } from '../../types';
import { Trophy, Share, Heart, Star } from 'lucide-react';

interface StatsDisplayProps {
  stats: UserProfile['stats'];
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h4 className="text-gray-600 font-medium">Longest Streak</h4>
        </div>
        <p className="text-2xl font-bold">{stats.longestStreak} days</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-pink-500" />
          <h4 className="text-gray-600 font-medium">Tips Viewed</h4>
        </div>
        <p className="text-2xl font-bold">{stats.totalComplimentsViewed}</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Share className="w-5 h-5 text-blue-500" />
          <h4 className="text-gray-600 font-medium">Total Shares</h4>
        </div>
        <p className="text-2xl font-bold">{stats.totalShares}</p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 text-purple-500" />
          <h4 className="text-gray-600 font-medium">Favorite Category</h4>
        </div>
        <p className="text-lg font-medium">{stats.favoriteCategory}</p>
      </div>
    </div>
  );
}; 