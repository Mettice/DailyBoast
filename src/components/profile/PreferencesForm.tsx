import React from 'react';
import * as Select from '@radix-ui/react-select';
import { UserProfile } from '../../types';
import { Switch } from '@headlessui/react';

import { TipCategory, TIP_CATEGORIES } from '../../types/tips';


interface PreferencesFormProps {
  preferences: UserProfile['preferences'];
  onUpdate: (preferences: Partial<UserProfile['preferences']>) => void;
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({ 
  preferences, 
  onUpdate 
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Preferences</h3>
      
      <div className="space-y-6">
        {/* Theme Selection */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 font-medium">Theme</label>
          <Select.Root>
            <Select.Trigger className="w-32">
              <Select.Value placeholder="Select theme" />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content>
                <Select.Item value="light">Light</Select.Item>
                <Select.Item value="dark">Dark</Select.Item>
                <Select.Item value="system">System</Select.Item>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <h4 className="text-gray-700 font-medium">Notifications</h4>
          
          <div className="flex items-center justify-between">
            <label className="text-gray-600">Daily Tips</label>
            <Switch
              checked={preferences.channels.dailyTips}
              onChange={(checked) => 
                onUpdate({
                  channels: {
                    ...preferences.channels,
                    dailyTips: checked
                  }
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-600">Achievements</label>
            <Switch
              checked={preferences.channels.achievements}
              onChange={(checked) => 
                onUpdate({
                  channels: {
                    ...preferences.channels,
                    achievements: checked
                  }
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-600">Streaks</label>
            <Switch
              checked={preferences.channels.streaks}
              onChange={(checked) => 
                onUpdate({
                  channels: {
                    ...preferences.channels,
                    streaks: checked
                  }
                })
              }
            />
          </div>
        </div>

        {/* Favorite Categories */}
        <div className="space-y-2">
          <label className="text-gray-700 font-medium">Favorite Categories</label>
          <div className="flex flex-wrap gap-2">
            {Object.values(TIP_CATEGORIES).map(category => (
              <button
                key={category}
                onClick={() => {
                  const currentCategories = preferences.favoriteCategories ?? [];
                  const newCategories = currentCategories.includes(category)
                    ? currentCategories.filter((c) => c !== category)
                    : [...currentCategories, category] as TipCategory[];
                  onUpdate({ favoriteCategories: newCategories });
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  (preferences.favoriteCategories || []).includes(category)
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 