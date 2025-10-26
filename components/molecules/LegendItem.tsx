import React from 'react';
import { LegendDot } from '../atoms/LegendDot';

interface LegendItemProps {
  size: 'small' | 'medium' | 'large';
  description: string;
}

export const LegendItem: React.FC<LegendItemProps> = ({ size, description }) => {
  return (
    <div className="flex items-center gap-3">
      <LegendDot size={size} />
      <span className="text-xs text-slate-600 font-medium">{description}</span>
    </div>
  );
};
