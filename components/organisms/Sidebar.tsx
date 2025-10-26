import React from 'react';
import { StatusMessage } from '../molecules/StatusMessage';
import { StatisticsGrid } from './StatisticsGrid';
import { FilterPanel } from './FilterPanel';
import { ExportSection } from './ExportSection';
import { Legend } from './Legend';
import { Statistics, FlaringDataPoint } from '../../lib/dataUtils';

interface SidebarProps {
  status: { type: 'loading' | 'success' | 'error'; message: string };
  stats: Statistics;
  countries: string[];
  types: string[];
  onApplyFilters: () => void;
  onYearChange: (year: string) => void;
  onTypeChange: (type: string) => void;
  onCountryChange: (country: string) => void;
  onMinVolumeChange: (volume: number) => void;
  onExportGeoJSON: () => void;
  onExportCSV: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  status,
  stats,
  countries,
  types,
  onApplyFilters,
  onYearChange,
  onTypeChange,
  onCountryChange,
  onMinVolumeChange,
  onExportGeoJSON,
  onExportCSV
}) => {
  return (
    <aside className="w-96 bg-white shadow-xl overflow-y-auto border-r border-slate-200">
      <div className="p-6 border-b border-slate-100">
        <StatusMessage type={status.type} message={status.message} />
      </div>
      
      <StatisticsGrid stats={stats} />
      
      <FilterPanel
        onApply={onApplyFilters}
        countries={countries}
        types={types}
        onYearChange={onYearChange}
        onTypeChange={onTypeChange}
        onCountryChange={onCountryChange}
        onMinVolumeChange={onMinVolumeChange}
      />
      
      <ExportSection
        onExportGeoJSON={onExportGeoJSON}
        onExportCSV={onExportCSV}
      />
      
      <Legend />
    </aside>
  );
};
