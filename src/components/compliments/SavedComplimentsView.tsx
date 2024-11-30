import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Trash2, X } from 'lucide-react';
import { useComplimentStore } from '../../store/useComplimentStore';
import type { Compliment } from '../../types';

interface SavedComplimentsViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavedComplimentsView: React.FC<SavedComplimentsViewProps> = ({
  isOpen,
  onClose
}) => {
  const { savedCompliments, removeSavedCompliment } = useComplimentStore();

  const handleShare = async (compliment: Compliment) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Joy',
          text: compliment.text,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-600" />
                  <h2 className="text-lg font-semibold">Saved Compliments</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {savedCompliments.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-gray-500"
                    >
                      No saved compliments yet.
                    </motion.div>
                  ) : (
                    savedCompliments.map((compliment) => (
                      <motion.div
                        key={compliment.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-xl p-4 shadow-sm border"
                      >
                        <div className="text-sm text-purple-600 mb-2">
                          {compliment.category}
                        </div>
                        <p className="text-gray-800 mb-4">{compliment.text}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {new Date(compliment.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleShare(compliment)}
                              className="p-2 hover:bg-blue-50 rounded-full text-blue-600"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeSavedCompliment(compliment.id)}
                              className="p-2 hover:bg-red-50 rounded-full text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};