import React from 'react';

interface InputProps {
  type?: string;
  id: string;
  value?: string | number;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ 
  type = 'text', 
  id, 
  value = '', 
  placeholder = '', 
  min, 
  max, 
  step,
  onChange 
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-lg text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    />
  );
};
