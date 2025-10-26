import React from 'react';
import { LegendItem } from '../molecules/LegendItem';

export const Legend: React.FC = () => {
  return (
    <div className="p-6 border-t border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100/50">
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Visual Legend
        </h4>
        
        <div className="space-y-3">
          <LegendItem size="small" description="Small Volume" />
          <LegendItem size="medium" description="Medium Volume" />
          <LegendItem size="large" description="Large Volume" />
        </div>
      </div>
    </div>
  );
};
