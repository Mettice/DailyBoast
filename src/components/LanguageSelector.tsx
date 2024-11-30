import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, type Language } from '../config/language';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all"
      >
        <Globe className="w-4 h-4 text-purple-600" />
        <span className="text-sm font-medium">
          {SUPPORTED_LANGUAGES[currentLanguage].flag}
          {SUPPORTED_LANGUAGES[currentLanguage].name}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-xl shadow-lg z-50"
            >
              {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
                <button
                  key={code}
                  onClick={() => {
                    onLanguageChange(code as Language);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </span>
                  {currentLanguage === code && (
                    <Check className="w-4 h-4 text-purple-600" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};