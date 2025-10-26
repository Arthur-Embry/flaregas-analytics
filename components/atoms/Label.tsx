import React from 'react';

interface LabelProps {
  text: string;
}

export const Label: React.FC<LabelProps> = ({ text }) => {
  return (
    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
      {text}
    </label>
  );
};
