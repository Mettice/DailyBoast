import React from 'react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button 
        onClick={onComplete}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg"
      >
        Get Started
      </button>
    </div>
  );
}; 