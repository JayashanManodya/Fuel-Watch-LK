import type { FuelStation, FuelStatus } from '../types';

interface OSMElement {
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: any;
}

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const API_URL = import.meta.env.VITE_API_URL || '/api';

function mapDbToFuelStation(dbStation: any): FuelStation {
  return {
    id: dbStation.id.toString(), // The numeric ID from the database
    stationCode: dbStation.stationCode,
    name: dbStation.name,
    nameSi: dbStation.nameSi,
    nameTa: dbStation.nameTa,
    status: dbStation.status || 'available',
    lastUpdated: dbStation.lastUpdated ? new Date(dbStation.lastUpdated).toLocaleString() : 'Just now',
    petrolQueueLength: dbStation.petrolQueueLength || 0,
    petrolWaitingTime: dbStation.petrolWaitingTime || 0,
    dieselQueueLength: dbStation.dieselQueueLength || 0,
    dieselWaitingTime: dbStation.dieselWaitingTime || 0,
    coordinates: [dbStation.lat, dbStation.lng] as [number, number],
    address: dbStation.address,
    addressSi: dbStation.addressSi,
    addressTa: dbStation.addressTa,
    fuelTypes: {
      petrol92: dbStation.petrol92Status === 'not-available' ? undefined : dbStation.petrol92Status as FuelStatus,
      petrol95: dbStation.petrol95Status === 'not-available' ? undefined : dbStation.petrol95Status as FuelStatus,
      autoDiesel: dbStation.autoDieselStatus === 'not-available' ? undefined : dbStation.autoDieselStatus as FuelStatus,
      superDiesel: dbStation.superDieselStatus === 'not-available' ? undefined : dbStation.superDieselStatus as FuelStatus,
      kerosene: dbStation.keroseneStatus === 'not-available' ? undefined : dbStation.keroseneStatus as FuelStatus,
    },
  };
}

export async function fetchFuelStations(): Promise<FuelStation[]> {
  try {
    // 1. Try to fetch from our local PostgreSQL API
    const response = await fetch(`${API_URL}/stations`);
    if (response.ok) {
      const dbStations = await response.json();
      if (dbStations && dbStations.length > 0) {
        return dbStations.map(mapDbToFuelStation);
      }
    }
  } catch (error) {
    console.warn('API /api/stations not reachable or empty. Falling back to OSM seed.', error);
  }

  // 2. If API is empty or failed, seed from OSM
  console.log('Seeding from OSM...');
  const query = `
    [out:json][timeout:25];
    area["name:en"="Sri Lanka"]->.searchArea;
    (
      node["amenity"="fuel"](area.searchArea);
      way["amenity"="fuel"](area.searchArea);
      relation["amenity"="fuel"](area.searchArea);
    );
    out center;
  `;

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(`${OVERPASS_URL}?data=${encodeURIComponent(query)}`, { signal: controller.signal });
    clearTimeout(id);

    if (!response.ok) throw new Error(`Failed to fetch data from OSM: ${response.status}`);
    
    const data = await response.json();
    const elements: OSMElement[] = data.elements || [];

    const osmStations = elements.map((el) => {
      const lat = el.lat || el.center?.lat || 0;
      const lon = el.lon || el.center?.lon || 0;
      
      const name = el.tags?.['name:en'] || el.tags?.name || el.tags?.brand || el.tags?.operator || 'Unknown Fuel Station';
      const nameSi = el.tags?.['name:si'] || el.tags?.['brand:si'] || el.tags?.['operator:si'];
      const nameTa = el.tags?.['name:ta'] || el.tags?.['brand:ta'] || el.tags?.['operator:ta'];

      const address = el.tags?.['addr:street'] ? `${el.tags['addr:street']}, ${el.tags['addr:city'] || ''}` : 'Address not available';
      const addressSi = el.tags?.['addr:street:si'] ? `${el.tags['addr:street:si']}, ${el.tags['addr:city:si'] || ''}` : undefined;
      const addressTa = el.tags?.['addr:street:ta'] ? `${el.tags['addr:street:ta']}, ${el.tags['addr:city:ta'] || ''}` : undefined;

      const defaultStatus: FuelStatus = 'out-of-stock';

      return {
        id: el.id.toString(), // osmId
        name,
        nameSi,
        nameTa,
        status: defaultStatus,
        lastUpdated: 'Live from Map',
        petrolQueueLength: 0,
        petrolWaitingTime: 0,
        dieselQueueLength: 0,
        dieselWaitingTime: 0,
        coordinates: [lat, lon] as [number, number],
        address,
        addressSi,
        addressTa,
        fuelTypes: {},
      };
    });

    // 3. Seed the local DB in the background
    try {
      await fetch(`${API_URL}/stations/seed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stations: osmStations }),
      });
      console.log('Successfully seeded database from OSM');
      
      // Fetch the mapped versions from DB after seeding so they have numeric IDs
      const refetchResponse = await fetch(`${API_URL}/stations`);
      if (refetchResponse.ok) {
        const dbStations = await refetchResponse.json();
        return dbStations.map(mapDbToFuelStation);
      }
    } catch (seedError) {
      console.error('Failed to seed DB, returning OSM data anyway', seedError);
    }

    return osmStations;
  } catch (error) {
    console.error('Error fetching fuel stations:', error);
    return [];
  }
}
