import React from 'react';
import { motion } from 'framer-motion';
import CategoryPicker from '../components/CategoryPicker';
import { CollectionsView } from '../components/engagement/Collections';
import { useComplimentStore } from '../store/useComplimentStore';
import { MoodSelector } from '../components/MoodSelector';
import { DailyTip } from '../components/tips/DailyTip';
import { ComplimentFeedback } from '../components/compliments/ComplimentFeedBack';
import { RefreshCw, Heart } from 'lucide-react';
import { Tooltip } from '../components/ui/Tooltip';
import { ShareMenu } from '../components/sharing/ShareMenu';
import { ShareImage } from '../components/sharing/ShareImage';
import { useTheme } from '../hooks/useTheme';
import { Profile } from '../components/profile/Profile';

export const Home = () => {
  const { 
    selectedCategory,
    selectedMood,
    handleGetCompliment,
    currentCompliment,
    handleSave,

  } = useComplimentStore();
  const { currentTheme } = useTheme();

  React.useEffect(() => {
    if (selectedCategory && selectedMood && !currentCompliment) {
      handleGetCompliment();
    }
  }, [selectedCategory, selectedMood]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[calc(100vh-4rem)] p-8 max-w-6xl mx-auto"
    >
      <div id="profile-section" className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Your Profile</h2>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-6">
          <Profile />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Categories</h2>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1200px] md:min-w-full">
            <CategoryPicker />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6">How are you feeling?</h2>
        <MoodSelector />
      </div>

      {currentCompliment && (
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-10 mb-12">
          <p className="text-xl text-center leading-relaxed mb-8">{currentCompliment.text}</p>
          
          <ComplimentFeedback 
            complimentId={currentCompliment.id}
            onFeedback={(positive, feedback) => {
              console.log('Feedback:', { positive, feedback });
            }}
          />

          <motion.div className="flex justify-center gap-6 mt-8">
            <Tooltip content="Get new compliment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGetCompliment()}
                className="p-4 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                <RefreshCw className="w-6 h-6" />
              </motion.button>
            </Tooltip>

            <Tooltip content="Save compliment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => currentCompliment && handleSave(currentCompliment)}
                className="p-4 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100"
              >
                <Heart className="w-6 h-6" />
              </motion.button>
            </Tooltip>

            <ShareMenu 
              compliment={currentCompliment}
              onShare={() => {
                console.log('Shared compliment:', currentCompliment);
              }}
            />
          </motion.div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <DailyTip />
      </div>

      <CollectionsView />
    </motion.div>
  );
}; 