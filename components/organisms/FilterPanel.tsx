import React from 'react';
import { FormField } from '../molecules/FormField';
import { SectionHeader } from '../molecules/SectionHeader';
import { Button } from '../atoms/Button';
import { Select } from '../atoms/Select';
import { Input } from '../atoms/Input';

interface FilterPanelProps {
  onApply: () => void;
  countries: string[];
  types: string[];
  onYearChange: (year: string) => void;
  onTypeChange: (type: string) => void;
  onCountryChange: (country: string) => void;
  onMinVolumeChange: (volume: number) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  onApply,
  countries,
  types,
  onYearChange,
  onTypeChange,
  onCountryChange,
  onMinVolumeChange
}) => {
  const yearOptions = Array.from({ length: 1 }, (_, i) => ({
    value: String(2024 - i),
    label: String(2024 - i)
  }));

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    ...types.map(type => ({ value: type, label: type }))
  ];

  const countryOptions = [
    { value: 'all', label: 'All Countries' },
    ...countries.map(country => ({ value: country, label: country }))
  ];

  return (
    <div className="p-6 space-y-6">
      <SectionHeader title="Filters" subtitle="Refine Data" />
      
      <div className="space-y-4">
        <FormField label="Year">
          <Select
            id="yearFilter"
            options={yearOptions}
            defaultValue="2024"
            onChange={(e) => onYearChange(e.target.value)}
          />
        </FormField>

        <FormField label="Facility Type">
          <Select
            id="typeFilter"
            options={typeOptions}
            defaultValue="all"
            onChange={(e) => onTypeChange(e.target.value)}
          />
        </FormField>

        <FormField label="Country">
          <Select
            id="countryFilter"
            options={countryOptions}
            defaultValue="all"
            onChange={(e) => onCountryChange(e.target.value)}
          />
        </FormField>

        <FormField label="Minimum Volume (BCM)">
          <Input
            type="number"
            id="minVolume"
            value="0"
            step="0.001"
            min="0"
            onChange={(e) => onMinVolumeChange(parseFloat(e.target.value) || 0)}
          />
        </FormField>

        <Button
          text="Apply Filters"
          onClick={onApply}
          variant="primary"
        />
      </div>
    </div>
  );
};
