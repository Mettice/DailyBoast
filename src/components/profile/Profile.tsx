import React from 'react';
import { useProfileStore } from '../../store/useProfileStore';
import { Camera } from 'lucide-react';

export const Profile: React.FC = () => {
  const { profile } = useProfileStore();

  return (
    <div className="flex items-center gap-6">
      {/* Profile Picture Section */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-purple-50">
          {profile?.profilePicture ? (
            <img 
              src={profile.profilePicture} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-purple-300">
              <Camera className="w-8 h-8" />
            </div>
          )}
        </div>
        <label className="absolute bottom-0 right-0 p-1.5 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-700 text-white">
          <Camera className="w-4 h-4" />
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={() => {/* handle image upload */}}
          />
        </label>
      </div>

      {/* Profile Info */}
      <div>
        <h3 className="text-xl font-semibold">
          {profile?.displayName || 'Welcome!'}
        </h3>
        <p className="text-gray-600">
          {profile?.bio || 'Add a bio to tell us about yourself'}
        </p>
        <div className="flex gap-4 mt-2">
          <div className="text-sm">
            <span className="font-medium">Streak:</span> {profile?.stats?.longestStreak || 0} days
          </div>
          <div className="text-sm">
            <span className="font-medium">Mood Entries:</span> {profile?.stats?.totalComplimentsViewed || 0}
          </div>
        </div>
      </div>
    </div>
  );
}; 