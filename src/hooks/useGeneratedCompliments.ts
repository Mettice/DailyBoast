import { useState } from 'react';
import { ComplimentCategory } from '../types';
import { generateCompliment } from '../services/llmService';
import { useComplimentStore } from '../store/useComplimentStore';

export const useGeneratedCompliments = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNewCompliment } = useComplimentStore();

  const generateNewCompliment = async (category: ComplimentCategory) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const generatedText = await generateCompliment(category);
      
      const newCompliment = {
        id: `generated-${Date.now()}`,
        text: generatedText,
        category,
        tags: [category, 'ai-generated'],
        isGenerated: true
      };

      addNewCompliment(newCompliment);
      return newCompliment;
    } catch (err) {
      setError('Failed to generate compliment');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateNewCompliment,
    isGenerating,
    error
  };
};