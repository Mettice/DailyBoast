import { useState } from 'react';
import axios from 'axios';

export const useFeedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitFeedback = async (
    complimentId: string,
    positive: boolean,
    feedback?: string
  ) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post('/api/compliment-feedback', {
        complimentId,
        positive,
        feedback
      });
    } catch (err) {
      setError('Failed to submit feedback');
      console.error('Error submitting feedback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitFeedback,
    isSubmitting,
    error
  };
};