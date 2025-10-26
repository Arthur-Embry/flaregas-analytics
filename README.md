# Global Flaring Data Viewer

A Next.js application that visualizes global flaring data using satellite heatmap data to identify opportunities for data center buildouts in areas with excess flare gas.

## Overview

This application uses heatmap data scanned from satellite imagery provided by the Colorado School of Mines from the EOG (https://payneinstitute.mines.edu/eog/) to identify locations where excess flare gas is being burned. This data serves as a valuable indicator for identifying regions where below-spot gas prices can be negotiated for data center buildouts.

## Features

- **Interactive Map Visualization**: View flaring sites on an interactive map with volume-based sizing
- **Real-time Filtering**: Filter data by year, facility type, country, and minimum volume
- **Statistical Dashboard**: View key metrics including active sites, total volume, countries, and facility types
- **Data Export**: Export filtered data as GeoJSON or CSV formats
- **Responsive Design**: Modern UI built with Tailwind CSS and atomic design principles

## Data Source

The application uses local CSV data (`flaring-data-2024.csv`) containing satellite-derived flaring measurements from 2024. This data includes:

- **Location Data**: Latitude and longitude coordinates
- **Volume Metrics**: BCM (Billion Cubic Meters) measurements
- **Facility Information**: Type, country, and ISO codes
- **Environmental Data**: Average temperature and detection frequency

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom color palette
- **Mapping**: React Leaflet with OpenStreetMap tiles
- **Data Processing**: Custom utilities for CSV parsing and filtering
- **Architecture**: Atomic Design Pattern (Atoms → Molecules → Organisms)

## Project Structure

```
datalake-nextjs/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── atoms/           # Basic building blocks
│   ├── molecules/        # Simple component groups
│   └── organisms/       # Complex components
├── lib/
│   └── dataUtils.ts     # Data processing utilities
├── public/
│   └── flaring-data-2024.csv
└── package.json
```

## Getting Started

### Option 1: Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Application**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Option 2: Docker Development

1. **Run with Docker Compose (Development)**:
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Open Application**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Option 3: Docker Production

1. **Build and Run Production Container**:
   ```bash
   docker-compose up --build
   ```

2. **Open Application**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Commands

- **Build only**: `docker-compose build`
- **Run in background**: `docker-compose up -d`
- **Stop containers**: `docker-compose down`
- **View logs**: `docker-compose logs -f`
- **Development mode**: `docker-compose -f docker-compose.dev.yml up`

## Usage

1. **View Data**: The application automatically loads and displays flaring sites on the map
2. **Apply Filters**: Use the sidebar filters to refine the data by various criteria
3. **Explore Sites**: Click on map markers to view detailed information about each flaring site
4. **Export Data**: Use the export buttons to download filtered data in GeoJSON or CSV format

## Data Interpretation

The flaring data represents locations where natural gas is being burned off rather than captured and utilized. High flaring volumes in specific regions indicate:

- **Excess Gas Supply**: Areas with more gas than can be efficiently transported or stored
- **Infrastructure Limitations**: Regions lacking pipeline capacity or processing facilities
- **Economic Opportunities**: Potential for below-market gas pricing for industrial applications

## Use Case: Data Center Siting

This data is particularly valuable for identifying optimal locations for data center buildouts where:

- **Low Energy Costs**: Excess gas can be converted to electricity at competitive rates
- **Environmental Benefits**: Capturing flare gas reduces emissions while providing power
- **Economic Development**: Creates value from otherwise wasted resources

## Contributing

This project demonstrates the application of satellite data analysis for infrastructure planning and environmental monitoring. The atomic design pattern ensures maintainable and scalable component architecture.

## License

This project is for educational and research purposes, utilizing publicly available satellite data for environmental and economic analysis.
