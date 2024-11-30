import { useEffect } from 'react';
import { useComplimentStore } from '../store/useComplimentStore';
import { trackEvent } from '../types/analytics';  // Add this import

export const SHORTCUTS = {
  'n': 'New compliment',
  's': 'Save compliment',
  'h': 'Share compliment',
  'k': 'Show keyboard shortcuts',
  'esc': 'Close modal'
} as const;

export const useKeyboardShortcuts = () => {
  const { fetchNewCompliment, saveCompliment, currentCompliment } = useComplimentStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'n':
          fetchNewCompliment();
          trackEvent('keyboard_shortcut_used', { action: 'new_compliment' });
          break;
        case 's':
          if (currentCompliment) {
            saveCompliment(currentCompliment);
            trackEvent('keyboard_shortcut_used', { action: 'save_compliment' });
          }
          break;
        case 'k':
          // Implement show shortcuts modal
          trackEvent('keyboard_shortcut_used', { action: 'show_shortcuts' });
          break;
        case 'escape':
          // Implement close modal
          trackEvent('keyboard_shortcut_used', { action: 'close_modal' });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [fetchNewCompliment, saveCompliment, currentCompliment]);
}; 