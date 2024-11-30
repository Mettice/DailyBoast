import React from 'react';
import { Sparkles } from 'lucide-react';
import { useComplimentStore } from '../../store/useComplimentStore';

export const GenerationToggle: React.FC = () => {
  const { fetchNewCompliment } = useComplimentStore();

  return (
    <button
      onClick={() => fetchNewCompliment()}
      className="flex items-center gap-2 px-4 py-2 rounded-full transition-all
        bg-gradient-to-r from-purple-500 to-pink-500 text-white"
    >
      <Sparkles className="w-4 h-4" />
      <span className="text-sm font-medium">Generate Compliment</span>
    </button>
  );
};