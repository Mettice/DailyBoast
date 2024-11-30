import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Share2, Download, Instagram, Twitter } from 'lucide-react';
import type { Compliment, Theme } from '../../types';

interface ShareImageProps {
  compliment: Compliment;
  theme: Theme;
}

export const ShareImage: React.FC<ShareImageProps> = ({ compliment, theme }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null
      });

      const dataUrl = canvas.toDataURL('image/png');
      
      // Create download link
      const link = document.createElement('a');
      link.download = 'daily-joy-compliment.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div
        ref={cardRef}
        className={`p-8 ${theme.borderRadius} ${theme.shadows.medium} aspect-square max-w-md mx-auto
          bg-gradient-to-br ${theme.colors.background}`}
      >
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <span className={`text-sm ${theme.colors.text} opacity-75 mb-4`}>
            {compliment.category}
          </span>
          
          <p className={`text-xl font-medium ${theme.colors.text} leading-relaxed mb-8`}>
            {compliment.text}
          </p>

          <div className="mt-auto">
            <img 
              src="/logo.png" 
              alt="Daily Joy" 
              className="h-8 opacity-50" 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <motion.button
          onClick={generateImage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 ${theme.borderRadius} bg-purple-100 text-purple-600`}
        >
          <Download className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={() => {/* Add Instagram sharing */}}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 ${theme.borderRadius} bg-pink-100 text-pink-600`}
        >
          <Instagram className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={() => {/* Add Twitter sharing */}}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 ${theme.borderRadius} bg-blue-100 text-blue-600`}
        >
          <Twitter className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};