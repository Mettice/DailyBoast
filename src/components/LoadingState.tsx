import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  variant?: 'spinner' | 'card' | 'inline';
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'spinner',
  text,
  size = 'md'
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (variant === 'inline') {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={`${sizes[size]} text-purple-600`} />
      </motion.div>
    );
  }

  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-sm max-w-md mx-auto"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className={`${sizes[size]} text-purple-600`} />
        </motion.div>
        {text && <p className="mt-4 text-gray-600">{text}</p>}
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={`${sizes[size]} text-purple-600`} />
      </motion.div>
    </div>
  );
};