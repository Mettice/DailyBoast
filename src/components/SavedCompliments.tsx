import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import { Compliment } from '../data/compliments';

interface SavedComplimentsProps {
  compliments: Compliment[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

const SavedCompliments: React.FC<SavedComplimentsProps> = ({
  compliments,
  onRemove,
  onClose
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-4"
    >
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Saved Compliments</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <AnimatePresence mode="popLayout">
            {compliments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No saved compliments yet</p>
            ) : (
              compliments.map((compliment) => (
                <motion.div
                  key={compliment.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-gray-50 p-4 rounded-xl relative group"
                >
                  <p className="text-gray-800 pr-8">{compliment.text}</p>
                  <button
                    onClick={() => onRemove(compliment.id)}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <span className="text-sm text-purple-600 mt-2 block">
                    {compliment.category}
                  </span>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default SavedCompliments;