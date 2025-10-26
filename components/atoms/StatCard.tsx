import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  color?: 'emerald' | 'amber' | 'blue' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  color = 'emerald' 
}) => {
  const colorClasses = {
    emerald: 'from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-600',
    amber: 'from-amber-50 to-amber-100 border-amber-200 text-amber-600',
    blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-600',
    purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-600'
  };
  
  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} p-4 rounded-lg border shadow-sm`}>
      <div className="text-xs font-bold uppercase tracking-wider mb-2">{title}</div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</div>
    </div>
  );
};
