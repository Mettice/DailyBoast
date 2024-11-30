import React from 'react';
import { motion } from 'framer-motion';
import { useProfileStore } from '../../store/useProfileStore';
import { MoodChart } from './MoodChart';
import { PreferencesForm } from './PreferencesForm';
import { StatsDisplay } from './StatsDisplay';

export const Profile: React.FC = () => {
  const { profile, moodEntries, getMoodAnalytics } = useProfileStore();
  const analytics = getMoodAnalytics();

  if (!profile) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-6"
    >
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{profile.username}</h2>
          <p className="text-gray-600">Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsDisplay stats={profile.stats} />

      {/* Mood Tracking */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Mood History</h3>
        <MoodChart entries={moodEntries} analytics={analytics} />
      </div>

      {/* Preferences */}
      <PreferencesForm 
        preferences={profile.preferences}
        onUpdate={useProfileStore.getState().updatePreferences}
      />
    </motion.div>
  );
}; 