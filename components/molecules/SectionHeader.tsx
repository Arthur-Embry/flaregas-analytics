import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  color?: 'emerald' | 'amber';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  color = 'emerald' 
}) => {
  const colors = {
    emerald: 'from-emerald-500 to-teal-400',
    amber: 'from-amber-500 to-amber-400'
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
        <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{subtitle}</span>
      </div>
      <div className={`h-1 w-16 bg-gradient-to-r ${colors[color]} rounded-full`} />
    </div>
  );
};
