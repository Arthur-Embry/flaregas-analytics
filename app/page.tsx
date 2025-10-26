'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '../components/organisms/Header';
import { Sidebar } from '../components/organisms/Sidebar';

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('../components/organisms/Map').then(mod => ({ default: mod.Map })), { 
  ssr: false,
  loading: () => (
    <main className="flex-1 relative">
      <div className="w-full h-full flex items-center justify-center bg-slate-100">
        <div className="text-slate-600">Loading map...</div>
      </div>
    </main>
  )
});
import { 
  FlaringDataPoint, 
  processCSVData, 
  calculateStatistics, 
  filterData, 
  getUniqueCountries, 
  getUniqueTypes 
} from '../lib/dataUtils';

export default function Home() {
  const [allData, setAllData] = useState<FlaringDataPoint[]>([]);
  const [filteredData, setFilteredData] = useState<FlaringDataPoint[]>([]);
  const [status, setStatus] = useState<{ type: 'loading' | 'success' | 'error'; message: string }>({
    type: 'loading',
    message: 'Loading data...'
  });
  
  const [filters, setFilters] = useState({
    year: '2024',
    type: 'all',
    country: 'all',
    minVolume: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allData, filters]);

  const loadData = async () => {
    try {
      const response = await fetch('/flaring-data-2024.csv');
      const csvText = await response.text();
      const data = processCSVData(csvText);
      
      setAllData(data);
      setStatus({
        type: 'success',
        message: `✓ Loaded ${data.length.toLocaleString()} flaring sites`
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: `✗ Error: ${error instanceof Error ? error.message : 'Failed to load data'}`
      });
    }
  };

  const applyFilters = () => {
    const filtered = filterData(allData, filters);
    setFilteredData(filtered);
  };

  const handleYearChange = (year: string) => {
    setFilters(prev => ({ ...prev, year }));
  };

  const handleTypeChange = (type: string) => {
    setFilters(prev => ({ ...prev, type }));
  };

  const handleCountryChange = (country: string) => {
    setFilters(prev => ({ ...prev, country }));
  };

  const handleMinVolumeChange = (minVolume: number) => {
    setFilters(prev => ({ ...prev, minVolume }));
  };

  const handleApplyFilters = () => {
    applyFilters();
  };

  const exportGeoJSON = () => {
    const geojson = {
      type: "FeatureCollection",
      features: filteredData.map(d => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [d.longitude, d.latitude]
        },
        properties: d
      }))
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flaring-data-${filters.year}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = ['latitude', 'longitude', 'country', 'type', 'iso_code', 
                   'bcm_2024', 'avg_temp_k', 'detection_frequency_2024', 'clear_obs_2024'];
    
    const csv = [
      headers.join(','),
      ...filteredData.map(d => headers.map(h => {
        const val = (d as any)[h];
        return val !== undefined ? val : '';
      }).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flaring-data-${filters.year}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = calculateStatistics(filteredData, filters.year);
  const countries = getUniqueCountries(allData);
  const types = getUniqueTypes(allData);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/20 min-h-screen">
      <Header />
      
      <div className="flex h-[calc(100vh-104px)]">
        <Sidebar
          status={status}
          stats={stats}
          countries={countries}
          types={types}
          onApplyFilters={handleApplyFilters}
          onYearChange={handleYearChange}
          onTypeChange={handleTypeChange}
          onCountryChange={handleCountryChange}
          onMinVolumeChange={handleMinVolumeChange}
          onExportGeoJSON={exportGeoJSON}
          onExportCSV={exportCSV}
        />
        
        <Map data={filteredData} year={filters.year} />
      </div>
    </div>
  );
}
