import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = "Something went wrong", 
  onRetry 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-sm max-w-md mx-auto"
    >
      <AlertCircle className="w-8 h-8 text-red-500" />
      <p className="mt-4 text-gray-800">{message}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="mt-4 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </motion.button>
    </motion.div>
  );
};