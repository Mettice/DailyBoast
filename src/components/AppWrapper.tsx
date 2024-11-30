import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../providers/AuthProvider';
import { LoadingScreen } from './LoadingScreen';        
import { OnboardingScreen } from './OnboardingScreen';

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [hasSeenOnboarding, setHasSeenOnboarding] = React.useState(() => 
    localStorage.getItem('hasSeenOnboarding') === 'true'
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (!hasSeenOnboarding) {
    return (
      <OnboardingScreen 
        onComplete={() => {
          localStorage.setItem('hasSeenOnboarding', 'true');
          setHasSeenOnboarding(true);
        }}
      />
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};