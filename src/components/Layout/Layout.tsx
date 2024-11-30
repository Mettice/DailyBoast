import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50"
    >
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </motion.div>
  );
};