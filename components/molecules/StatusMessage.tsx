import React from 'react';
import { Spinner } from '../atoms/Spinner';

interface StatusMessageProps {
  type?: 'loading' | 'success' | 'error';
  message: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ 
  type = 'loading', 
  message 
}) => {
  const types = {
    loading: 'from-amber-50 to-amber-100 border-amber-200 text-amber-900',
    success: 'from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-900',
    error: 'from-red-50 to-red-100 border-red-200 text-red-900'
  };
  
  return (
    <div className={`bg-gradient-to-r ${types[type]} border rounded-lg p-4 text-center`}>
      {type === 'loading' && <Spinner />}
      <div className="font-semibold text-sm">{message}</div>
    </div>
  );
};
