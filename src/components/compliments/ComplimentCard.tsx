import React from 'react';
import { RefreshCw, Heart, Share2 } from 'lucide-react';
import { Compliment } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ShareMenu } from '../sharing/ShareMenu';
import { ShareToast } from '../sharing/ShareToast';

interface ComplimentCardProps {
  compliment: Compliment;
  onRefresh: () => void;
  onShare: () => void;
  onSave: () => void;
}

const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 }
};

export const ComplimentCard: React.FC<ComplimentCardProps> = ({
  compliment,
  onRefresh,
  onShare,
  onSave,
}) => {
  const [shareToast, setShareToast] = React.useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  return (
    <motion.div 
      {...animationConfig}
      className="bg-white rounded-2xl p-6 shadow-sm max-w-2xl mx-auto"
      data-testid="compliment-card"
    >
      <div className="space-y-4">
        <span className="inline-block px-3 py-1 text-sm text-purple-600 bg-purple-50 rounded-full">
          {compliment.category}
        </span>
        <p className="text-gray-800 text-lg leading-relaxed">
          {compliment.text}
        </p>
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="p-2 hover:bg-purple-50 rounded-full text-purple-600"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onSave}
              className="p-2 hover:bg-rose-50 rounded-full text-rose-600"
            >
              <Heart className="w-4 h-4" />
            </button>
            <ShareMenu 
              compliment={compliment}
              onShare={() => {
                setShareToast({
                  message: 'Compliment shared successfully!',
                  type: 'success'
                });
              }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {shareToast && (
          <ShareToast
            message={shareToast.message}
            type={shareToast.type}
            onClose={() => setShareToast(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};