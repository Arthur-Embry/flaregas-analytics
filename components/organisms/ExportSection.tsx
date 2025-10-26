import React from 'react';
import { SectionHeader } from '../molecules/SectionHeader';
import { Button } from '../atoms/Button';

interface ExportSectionProps {
  onExportGeoJSON: () => void;
  onExportCSV: () => void;
}

export const ExportSection: React.FC<ExportSectionProps> = ({
  onExportGeoJSON,
  onExportCSV
}) => {
  return (
    <div className="p-6 border-t border-slate-100 space-y-4">
      <SectionHeader title="Export Data" subtitle="Download" color="amber" />
      
      <div className="space-y-3">
        <Button
          text="Download GeoJSON"
          onClick={onExportGeoJSON}
          variant="secondary"
          icon="📥"
        />
        
        <Button
          text="Download CSV"
          onClick={onExportCSV}
          variant="secondary"
          icon="📊"
        />
      </div>
    </div>
  );
};
