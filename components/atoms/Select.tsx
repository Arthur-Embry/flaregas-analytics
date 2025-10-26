import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({ 
  id, 
  options, 
  defaultValue,
  onChange 
}) => {
  return (
    <select
      id={id}
      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
