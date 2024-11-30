import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useMoodStore } from '../../store/useMoodStore';
import { MoodType } from '@/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getMoodValue = (mood: MoodType): number => {
  const moodValues: Record<MoodType, number> = {
    energetic: 9,
    peaceful: 8,
    motivated: 9,
    tired: 3,
    focused: 7,
    happy: 9,
    sad: 3,
    anxious: 4,
    stressed: 3,
    angry: 2,
    frustrated: 3,
    depressed: 1,
    lonely: 2,
    bored: 4,
    confused: 4,
    disheartened: 2,
    neutral: 5
  };
  return moodValues[mood];
};

const getMoodLabel = (value: number): string => {
  if (value >= 8) return 'Very Good';
  if (value >= 6) return 'Good';
  if (value >= 4) return 'Neutral';
  if (value >= 2) return 'Bad';
  return 'Very Bad';
};

const getImprovementTrend = (trend: number): string => {
  if (trend > 0) return '↗️ Improving';
  if (trend < 0) return '↘️ Declining';
  return '→ Stable';
};

export const MoodChart: React.FC = () => {
  const entries = useMoodStore(state => state.entries);
  const analytics = useMoodStore(state => state.analytics);
  const weeklyMoods = useMoodStore(state => state.getWeeklyMoods());

  const data = {
    labels: entries.map(entry => 
      new Date(entry.date).toLocaleDateString()
    ),
    datasets: [{
      label: 'Mood Over Time',
      data: entries.map(entry => getMoodValue(entry.mood)),
      fill: false,
      borderColor: 'rgb(147, 51, 234)',
      tension: 0.1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your Mood Journey'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 9,
        ticks: {
          callback: function(tickValue: number | string) {
            return getMoodLabel(Number(tickValue));
          }
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-purple-50 p-4 rounded-xl">
          <h4 className="font-medium text-purple-700">Most Frequent Mood</h4>
          <p className="text-lg">{analytics.mostFrequentMood}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl">
          <h4 className="font-medium text-purple-700">Mood Streak</h4>
          <p className="text-lg">🔥 {analytics.streakCount} days</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl">
          <h4 className="font-medium text-purple-700">Weekly Average</h4>
          <p className="text-lg">{analytics.weeklyAverage.toFixed(1)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl">
          <h4 className="font-medium text-purple-700">Trend</h4>
          <p className="text-lg">{getImprovementTrend(analytics.improvementTrends)}</p>
        </div>
      </div>
    </div>
  );
}; 