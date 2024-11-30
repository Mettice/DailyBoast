import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSelectProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
}

export const TimeSelect: React.FC<TimeSelectProps> = ({ 
  value, 
  onChange,
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
      />
    </div>
  );
}; 