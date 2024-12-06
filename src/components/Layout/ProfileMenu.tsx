import React from 'react';
import { useProfileStore } from '../../store/useProfileStore';
import { Settings, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu: React.FC = () => {
  const { profile } = useProfileStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsOpen(false);
    // Scroll to profile section on home page
    navigate('/#profile');
    document.getElementById('profile-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-purple-50">
          {profile?.profilePicture ? (
            <img 
              src={profile.profilePicture} 
              alt={profile.displayName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-600">
              {profile?.displayName?.[0] || 'U'}
            </div>
          )}
        </div>
        <span className="text-sm font-medium">{profile?.displayName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <button 
            onClick={handleProfileClick}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 w-full"
          >
            <User className="w-4 h-4" />
            View Profile
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 w-full"
          >
            <Settings className="w-4 h-4" />
            Manage Account
          </button>
          <button 
            onClick={() => {/* handle sign out */}}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}; 