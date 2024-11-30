import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';

interface ShareToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const ShareToast: React.FC<ShareToastProps> = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 
        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
        text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2`}
    >
      {type === 'success' ? (
        <Check className="w-4 h-4" />
      ) : (
        <AlertCircle className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 p-1 hover:bg-white/20 rounded-full"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};