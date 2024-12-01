import { Link, useLocation } from 'react-router-dom';
import { Trophy, Zap, Calendar, Home } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();
  
  const links = [
    { to: '/dashboard', icon: Home, label: 'Home' },
    { to: '/dashboard/achievements', icon: Trophy, label: 'Achievements' },
    { to: '/dashboard/streaks', icon: Zap, label: 'Streaks' },
    { to: '/dashboard/history', icon: Calendar, label: 'History' },
  ];

  return (
    <div className="w-64 bg-white rounded-lg p-4 shadow-sm">
      <nav className="space-y-2">
        {links.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === to
                ? 'bg-purple-100 text-purple-900'
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}; 