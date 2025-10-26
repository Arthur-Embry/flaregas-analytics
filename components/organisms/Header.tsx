import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-teal-500 shadow-lg">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span>Flare Gas Analytics</span>
            </h1>
            <p className="text-emerald-50 text-sm font-medium tracking-wide">
              Local Satellite Data · Real-time Environmental Intelligence · 2024
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right">
              <div className="text-emerald-50 text-xs uppercase tracking-wider font-semibold">Data Source</div>
              <div className="text-white font-bold">Local CSV</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
