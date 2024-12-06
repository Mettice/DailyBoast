import React from 'react';
import { Bell, Globe } from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';
import { useProfileStore } from '../../store/useProfileStore';

export const Header = () => {
  const { login, user, logout } = useAuth();
  const { profile } = useProfileStore();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-menu')) {
      setIsProfileOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-purple-600">BoostAi</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Globe className="w-5 h-5 text-gray-600" />
          </button>
          
          {user ? (
            <div className="relative profile-menu">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2"
              >
                <img 
                  src={profile?.profilePicture || '/default-avatar.png'} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={profile?.profilePicture || '/default-avatar.png'} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{profile?.displayName || 'User'}</div>
                      <div className="text-sm text-gray-500">{profile?.email || ''}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {/* handle manage account */}}
                      className="flex-1 px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Manage account
                    </button>
                    <button 
                      onClick={logout}
                      className="flex-1 px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={login}
              className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};