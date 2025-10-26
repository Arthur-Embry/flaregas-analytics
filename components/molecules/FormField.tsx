import React from 'react';
import { Label } from '../atoms/Label';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children }) => {
  return (
    <div className="space-y-2">
      <Label text={label} />
      {children}
    </div>
  );
};
