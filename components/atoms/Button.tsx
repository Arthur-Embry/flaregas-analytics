import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  variant = 'primary', 
  icon = '', 
  fullWidth = true 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600',
    secondary: 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700'
  };
  
  return (
    <button
      className={`${variants[variant]} text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-sm ${fullWidth ? 'w-full' : ''}`}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};
