import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHORTCUTS } from '../../utils/shortcuts';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-xl p-6 max-w-md w-full space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold">Keyboard Shortcuts</h2>
            <div className="space-y-2">
              {Object.entries(SHORTCUTS).map(([key, description]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-600">{description}</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">{key}</kbd>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
