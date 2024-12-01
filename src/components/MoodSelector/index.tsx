import { Sun, Moon, Star, Coffee, Target, Smile, Frown, AlertCircle, XCircle, Cloud, Users, HelpCircle, Heart } from 'lucide-react';
import { useAnalytics } from "../../components/analytics/AnalyticsProvider";
import type { MoodType } from '../../types';

const moods = [
  { id: 'energetic', icon: Sun, label: 'Energetic' },
  { id: 'peaceful', icon: Moon, label: 'Peaceful' },
  { id: 'motivated', icon: Star, label: 'Motivated' },
  { id: 'tired', icon: Coffee, label: 'Tired' },
  { id: 'focused', icon: Target, label: 'Focused' },
  { id: 'happy', icon: Smile, label: 'Happy' },
  { id: 'sad', icon: Frown, label: 'Sad' },
  { id: 'anxious', icon: AlertCircle, label: 'Anxious' },
  { id: 'stressed', icon: XCircle, label: 'Stressed' },
  { id: 'grateful', icon: Heart, label: 'Grateful' },
  { id: 'excited', icon: Cloud, label: 'Excited' },
  { id: 'content', icon: Cloud, label: 'Content' },
  { id: 'bored', icon: Cloud, label: 'Bored' },
  { id: 'neutral', icon: Cloud, label: 'Neutral' }
] as const;

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onMoodSelect: (mood: MoodType) => void;
}

const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  const { trackEvent } = useAnalytics();

  const handleMoodSelect = (mood: MoodType) => {
    onMoodSelect(mood);
    trackEvent('mood_selected', { mood });
  };

  return (
    <div className="w-full mb-8">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {moods.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => handleMoodSelect(id as MoodType)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl
              transition-all duration-200
              ${selectedMood === id 
                ? 'bg-white shadow-sm ring-1 ring-purple-200' 
                : 'bg-white/50 hover:bg-white hover:shadow-sm'
              }
            `}
          >
            <Icon 
              className={`w-5 h-5 mb-2 ${
                selectedMood === id ? 'text-purple-600' : 'text-gray-600'
              }`} 
            />
            <span className="text-xs text-gray-600 font-medium">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;