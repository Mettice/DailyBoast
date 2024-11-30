import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun, Trophy, Calendar, Heart, Brain } from 'lucide-react';
import { useNotificationStore } from '../../store/useNotificationStore';
import { Switch } from '@headlessui/react';
import { TimeSelect } from '../ui/TimeSelect';

export const NotificationPreferences: React.FC = () => {
  const { preferences, updatePreferences, requestPermission, hasPermission } = useNotificationStore();

  const handlePermissionRequest = async () => {
    await requestPermission();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-3xl p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Notification Settings</h3>
        <button
          data-testid="notification-toggle"
          onClick={handlePermissionRequest}
          className={`px-4 py-2 rounded-full text-sm ${
            hasPermission 
              ? 'bg-green-100 text-green-700'
              : 'bg-purple-100 text-purple-700'
          }`}
        >
          {hasPermission ? 'Notifications Enabled' : 'Enable Notifications'}
        </button>
      </div>

      {/* Main Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-600" />
          <span className="font-medium">All Notifications</span>
        </div>
        <Switch
          checked={preferences.enabled}
          onChange={(checked) => 
            updatePreferences({ enabled: checked })
          }
        />
      </div>

      {/* Quiet Hours */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Moon className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Quiet Hours</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Start</label>
            <TimeSelect
              value={preferences.quietHours.start}
              onChange={(time) => 
                updatePreferences({
                  quietHours: { ...preferences.quietHours, start: time }
                })
              }
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">End</label>
            <TimeSelect
              value={preferences.quietHours.end}
              onChange={(time) => 
                updatePreferences({
                  quietHours: { ...preferences.quietHours, end: time }
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Notification Channels */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">Notification Types</h4>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-500" />
            <span>Daily Tips</span>
          </div>
          <Switch
            checked={preferences.channels.dailyTips}
            onChange={(checked) => 
              updatePreferences({
                channels: { ...preferences.channels, dailyTips: checked }
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span>Achievements</span>
          </div>
          <Switch
            checked={preferences.channels.achievements}
            onChange={(checked) => 
              updatePreferences({
                channels: { ...preferences.channels, achievements: checked }
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-500" />
            <span>Streaks</span>
          </div>
          <Switch
            checked={preferences.channels.streaks}
            onChange={(checked) => 
              updatePreferences({
                channels: { ...preferences.channels, streaks: checked }
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span>Compliments</span>
          </div>
          <Switch
            checked={preferences.channels.compliments}
            onChange={(checked) => 
              updatePreferences({
                channels: { ...preferences.channels, compliments: checked }
              })
            }
          />
        </div>
      </div>
    </motion.div>
  );
}; 