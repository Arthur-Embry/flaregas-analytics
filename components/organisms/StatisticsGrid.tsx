import React from 'react';
import { StatCard } from '../atoms/StatCard';
import { Statistics } from '../../lib/dataUtils';

interface StatisticsGridProps {
  stats: Statistics;
}

export const StatisticsGrid: React.FC<StatisticsGridProps> = ({ stats }) => {
  const cards = [
    { title: 'Active Sites', value: stats.activeSites.toLocaleString(), subtitle: stats.year, color: 'emerald' as const },
    { title: 'Total Volume', value: stats.totalVolume.toFixed(2), subtitle: 'BCM', color: 'amber' as const },
    { title: 'Countries', value: stats.countries, subtitle: 'Regions', color: 'blue' as const },
    { title: 'Top Type', value: stats.topType, subtitle: 'Facility', color: 'purple' as const }
  ];
  
  return (
    <div className="grid grid-cols-2 gap-4 p-6 border-b border-slate-100">
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
};
