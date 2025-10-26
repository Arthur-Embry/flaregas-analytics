'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FlaringDataPoint } from '../../lib/dataUtils';

// Fix for default markers in React Leaflet
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

interface MapProps {
  data: FlaringDataPoint[];
  year: string;
}

const MapContent: React.FC<{ data: FlaringDataPoint[]; year: string }> = ({ data, year }) => {
  const map = useMap();
  
  useEffect(() => {
    if (data.length > 0) {
      const bounds = data
        .filter(d => d.latitude && d.longitude && d.bcm_2024 > 0)
        .map(d => [d.latitude, d.longitude] as [number, number]);
      
      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
      }
    }
  }, [data, map]);

  return null;
};

export const Map: React.FC<MapProps> = ({ data, year }) => {
  if (typeof window === 'undefined') {
    return (
      <main className="flex-1 relative">
        <div className="w-full h-full flex items-center justify-center bg-slate-100">
          <div className="text-slate-600">Loading map...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 relative">
      <MapContainer
        center={[40, -95]}
        zoom={4}
        className="w-full h-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        
        <MapContent data={data} year={year} />
        
        {data
          .filter(d => d.latitude && d.longitude && d.bcm_2024 > 0)
          .map((d, index) => {
            const radius = Math.max(3, Math.min(25, Math.sqrt(d.bcm_2024) * 50));
            
            return (
              <CircleMarker
                key={index}
                center={[d.latitude, d.longitude]}
                radius={radius}
                color="#991b1b"
                fillColor="#ef4444"
                fillOpacity={0.6}
                weight={2}
              >
                <Popup>
                  <div className="p-2 font-sans">
                    <div className="font-bold text-lg text-slate-900 mb-2">
                      {d.type || 'Unknown'}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="font-semibold text-slate-600">Country:</span> {d.country || 'Unknown'}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-600">{year} Volume:</span> {d.bcm_2024.toFixed(4)} BCM
                      </div>
                      <div>
                        <span className="font-semibold text-slate-600">Avg Temp:</span> {d.avg_temp_k}K
                      </div>
                      <div>
                        <span className="font-semibold text-slate-600">Detection:</span> {(d.detection_frequency_2024 * 100).toFixed(2)}%
                      </div>
                      <div className="text-xs text-slate-500 mt-2">
                        {d.latitude.toFixed(4)}, {d.longitude.toFixed(4)}
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
      </MapContainer>
      
      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm shadow-xl rounded-lg px-4 py-3 border border-slate-200 z-[1000]">
        <div className="text-xs text-slate-600 font-semibold">
          Data: <span className="text-emerald-600">Local CSV</span> · 
          Map: <span className="text-emerald-600">OpenStreetMap</span>
        </div>
      </div>
    </main>
  );
};