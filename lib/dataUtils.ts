export interface FlaringDataPoint {
  latitude: number;
  longitude: number;
  country: string;
  type: string;
  iso_code: string;
  bcm_2024: number;
  avg_temp_k: number;
  detection_frequency_2024: number;
  clear_obs_2024: number;
}

export interface Statistics {
  activeSites: number;
  totalVolume: number;
  countries: number;
  topType: string;
  year: string;
}

export const processCSVData = (csvText: string): FlaringDataPoint[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const dataPoint: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      if (header === 'latitude' || header === 'longitude' || header === 'bcm_2024' || 
          header === 'avg_temp_k' || header === 'detection_frequency_2024' || header === 'clear_obs_2024') {
        dataPoint[header] = parseFloat(value) || 0;
      } else {
        dataPoint[header] = value;
      }
    });
    
    return dataPoint as FlaringDataPoint;
  });
};

export const calculateStatistics = (data: FlaringDataPoint[], year: string = '2024'): Statistics => {
  const activeFeatures = data.filter(d => d.bcm_2024 > 0);
  const totalVolume = data.reduce((sum, d) => sum + d.bcm_2024, 0);
  const countries = new Set(activeFeatures.map(d => d.country)).size;
  
  const types: { [key: string]: number } = {};
  activeFeatures.forEach(d => {
    types[d.type] = (types[d.type] || 0) + 1;
  });
  
  const mostCommonType = Object.entries(types).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  
  return {
    activeSites: activeFeatures.length,
    totalVolume: totalVolume,
    countries: countries,
    topType: mostCommonType,
    year: year
  };
};

export const filterData = (
  data: FlaringDataPoint[], 
  filters: {
    year?: string;
    type?: string;
    country?: string;
    minVolume?: number;
  }
): FlaringDataPoint[] => {
  return data.filter(d => {
    if (filters.minVolume !== undefined && d.bcm_2024 < filters.minVolume) return false;
    if (filters.type && filters.type !== 'all' && d.type !== filters.type) return false;
    if (filters.country && filters.country !== 'all' && d.country !== filters.country) return false;
    return true;
  });
};

export const getUniqueCountries = (data: FlaringDataPoint[]): string[] => {
  return [...new Set(data.map(d => d.country))].filter(Boolean).sort();
};

export const getUniqueTypes = (data: FlaringDataPoint[]): string[] => {
  return [...new Set(data.map(d => d.type))].filter(Boolean).sort();
};
