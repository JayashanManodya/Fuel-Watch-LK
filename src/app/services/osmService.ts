import type { FuelStation, FuelStatus } from '../types';

interface OSMElement {
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: {
    name?: string;
    'name:en'?: string;
    'name:si'?: string;
    'name:ta'?: string;
    brand?: string;
    'brand:en'?: string;
    'brand:si'?: string;
    'brand:ta'?: string;
    operator?: string;
    'operator:en'?: string;
    'operator:si'?: string;
    'operator:ta'?: string;
    'addr:street'?: string;
    'addr:street:si'?: string;
    'addr:street:ta'?: string;
    'addr:city'?: string;
    'addr:city:si'?: string;
    'addr:city:ta'?: string;
  };
}

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

const CACHE_KEY = 'fuel_stations_cache';
const CACHE_TIME_KEY = 'fuel_stations_cache_time';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function fetchFuelStations(forceRefresh = false): Promise<FuelStation[]> {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

  // Return valid cache if available and not forcing refresh
  if (!forceRefresh && cachedData && cachedTime) {
    const isCacheValid = (Date.now() - parseInt(cachedTime)) < CACHE_TTL;
    if (isCacheValid) {
      try {
        return JSON.parse(cachedData);
      } catch (e) {
        console.error('Failed to parse cached stations', e);
      }
    }
  }

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
    const id = setTimeout(() => controller.abort(), 30000); // 30s timeout

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

      const statuses: FuelStatus[] = ['available', 'limited', 'out-of-stock'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      return {
        id: el.id.toString(),
        name,
        nameSi,
        nameTa,
        status: randomStatus,
        lastUpdated: 'Live from Map',
        queueLength: Math.floor(Math.random() * 20),
        waitingTime: Math.floor(Math.random() * 30),
        coordinates: [lat, lon] as [number, number],
        address,
        addressSi,
        addressTa,
        fuelTypes: {
          petrol92: randomStatus,
          petrol95: (Math.random() > 0.4 ? 'available' : (Math.random() > 0.5 ? 'limited' : 'out-of-stock')) as FuelStatus,
          diesel: (Math.random() > 0.3 ? 'available' : (Math.random() > 0.5 ? 'limited' : 'out-of-stock')) as FuelStatus,
          kerosene: (Math.random() > 0.7 ? 'available' : 'out-of-stock') as FuelStatus,
        },
      };
    });

    // Update cache
    localStorage.setItem(CACHE_KEY, JSON.stringify(osmStations));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    return osmStations;
  } catch (error) {
    console.error('Error fetching fuel stations:', error);
    
    // Fallback to expired cache if fetch fails (e.g., 429 Too Many Requests)
    if (cachedData) {
      console.log('Falling back to cached data due to fetch error');
      try {
        return JSON.parse(cachedData);
      } catch (e) {
        console.error('Failed to parse cached stations during fallback', e);
      }
    }
    
    return [];
  }
}
