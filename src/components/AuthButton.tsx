import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';

export const AuthButton: React.FC = () => {
  const { isAuthenticated, user, login, logout, loading } = useAuth();

  if (loading) {
    return (
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="w-24 h-8 bg-gray-200 rounded-lg"
      />
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm"
        >
          <img
            src={user.picture}
            alt={user.given_name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm font-medium">{user.given_name}</span>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => logout()}
          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
        >
          <LogOut className="w-4 h-4" />
        </motion.button>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => login()}
      className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
    >
      <LogIn className="w-4 h-4" />
      <span>Sign In</span>
    </motion.button>
  );
};