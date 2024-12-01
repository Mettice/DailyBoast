import React from 'react';
import { motion } from 'framer-motion';
import { AuthButton } from '../AuthButton';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-900">DailyBoast</h1>
          <AuthButton />
        </div>
      </nav>
      <div className="container mx-auto px-4 py-6 flex gap-6">
        <Sidebar />
        <main className="flex-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}; 