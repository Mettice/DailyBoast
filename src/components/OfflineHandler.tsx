import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export const OfflineHandler: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-yellow-50 text-yellow-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
      <WifiOff className="w-4 h-4" />
      <span>You're offline. Some features may be limited.</span>
    </div>
  );
};