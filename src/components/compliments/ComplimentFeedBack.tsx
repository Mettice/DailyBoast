import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComplimentFeedbackProps {
  complimentId: string;
  onFeedback: (positive: boolean, feedback?: string) => void;
}

export const ComplimentFeedback: React.FC<ComplimentFeedbackProps> = ({
  complimentId,
  onFeedback,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    window.addEventListener('online', () => setIsOffline(false));
    window.addEventListener('offline', () => setIsOffline(true));
    
    // Cleanup
    return () => {
      window.removeEventListener('online', () => setIsOffline(false));
      window.removeEventListener('offline', () => setIsOffline(true));
    };
  }, []);

  const loadingStates = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  const handleFeedback = (positive: boolean) => {
    onFeedback(positive);
    setShowFeedback(true);
  };

  const submitFeedback = () => {
    onFeedback(true, feedbackText);
    setSubmitted(true);
    setShowFeedback(false);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={loadingStates}
    >
      {!submitted && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleFeedback(true)}
              className="p-2 rounded-full hover:bg-green-50 text-green-600"
            >
              <ThumbsUp className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleFeedback(false)}
              className="p-2 rounded-full hover:bg-red-50 text-red-600"
            >
              <ThumbsDown className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFeedback(true)}
              className="p-2 rounded-full hover:bg-blue-50 text-blue-600"
            >
              <MessageSquare className="w-5 h-5" />
            </motion.button>
          </div>

          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full max-w-md"
              >
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Tell us what you think about this compliment..."
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={submitFeedback}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Submit Feedback
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      {isOffline && <div>You are currently offline</div>}
    </motion.div>
  );
};