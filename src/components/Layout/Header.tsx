import React from 'react';
import { Bell, Globe } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-purple-600">Daily Joy</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Globe className="w-5 h-5 text-gray-600" />
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};