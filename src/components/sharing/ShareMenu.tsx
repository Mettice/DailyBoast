import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, Twitter, Facebook, Linkedin, Copy, Mail, 
  MessageCircle, Download, X, Check 
} from 'lucide-react';
import { SharingService } from '../../services/sharingServices';
import type { Compliment } from '../../types';
import type { Tip } from '../../types/tips';

interface ShareMenuProps {
  compliment: Compliment | Tip;
  onShare?: () => void;
  renderContent?: () => React.ReactNode;
}

interface ShareOption {
  id: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  color: string;
  platform: Parameters<typeof SharingService.share>[0]['platform'];
}

const shareOptions: ShareOption[] = [
  { 
    id: 'twitter', 
    icon: Twitter, 
    label: 'Twitter', 
    color: 'bg-sky-100 text-sky-600 hover:bg-sky-200',
    platform: 'twitter'
  },
  { 
    id: 'facebook', 
    icon: Facebook, 
    label: 'Facebook', 
    color: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    platform: 'facebook'
  },
  { 
    id: 'linkedin', 
    icon: Linkedin, 
    label: 'LinkedIn', 
    color: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200',
    platform: 'linkedin'
  },
  { 
    id: 'whatsapp', 
    icon: MessageCircle, 
    label: 'WhatsApp', 
    color: 'bg-green-100 text-green-600 hover:bg-green-200',
    platform: 'whatsapp'
  },
  { 
    id: 'email', 
    icon: Mail, 
    label: 'Email', 
    color: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
    platform: 'email'
  },
  { 
    id: 'copy', 
    icon: Copy, 
    label: 'Copy', 
    color: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    platform: 'copy'
  },
  { 
    id: 'download', 
    icon: Download, 
    label: 'Download', 
    color: 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200',
    platform: 'download'
  },
];

export const ShareMenu: React.FC<ShareMenuProps> = ({ 
  compliment, 
  onShare,
  renderContent 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = async (option: ShareOption) => {
    const success = await SharingService.share({
      platform: option.platform,
      compliment: compliment as (Compliment | Tip),
      renderContent: renderContent
    });

    if (success) {
      if (option.id === 'copy') {
        setCopiedId(option.id);
        setTimeout(() => setCopiedId(null), 2000);
      }
      onShare?.();
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
      >
        <Share2 className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-full right-0 mb-2 p-2 bg-white rounded-xl shadow-xl z-50 min-w-[200px]"
            >
              <div className="p-2 space-y-1">
                {shareOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleShare(option)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${option.color}`}
                    whileHover={{ x: 4 }}
                  >
                    <option.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{option.label}</span>
                    {copiedId === option.id && (
                      <Check className="w-4 h-4 ml-auto" />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="border-t mt-2 pt-2 px-2">
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                  whileHover={{ x: 4 }}
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">Close</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};