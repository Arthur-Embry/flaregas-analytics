import React from 'react';

interface LegendDotProps {
  size?: 'small' | 'medium' | 'large';
}

export const LegendDot: React.FC<LegendDotProps> = ({ size = 'small' }) => {
  const sizes = {
    small: 'w-2 h-2',
    medium: 'w-4 h-4',
    large: 'w-6 h-6'
  };
  
  return (
    <div className={`${sizes[size]} rounded-full bg-red-500 border-2 border-red-700 shadow-sm`} />
  );
};
