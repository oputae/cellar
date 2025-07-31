import { Wine, WineFilter, WineType } from '@/types/wine';
import winesData from '@/data/wines.json';

export function getAllWines(): Wine[] {
  return winesData as Wine[];
}

export function getWineById(id: string): Wine | undefined {
  return getAllWines().find(wine => wine.id === id);
}

export function filterWines(wines: Wine[], filter: WineFilter): Wine[] {
  return wines.filter(wine => {
    if (filter.type && wine.type !== filter.type) return false;
    if (filter.favorite !== undefined && wine.favorite !== filter.favorite) return false;
    if (filter.region && !wine.region.toLowerCase().includes(filter.region.toLowerCase())) return false;
    if (filter.country && wine.country && !wine.country.toLowerCase().includes(filter.country.toLowerCase())) return false;
    if (filter.keyword) {
      const keyword = filter.keyword.toLowerCase();
      const searchableFields = [
        wine.name,
        wine.notes,
        wine.winery,
        wine.region,
        wine.country,
        ...(wine.aromas || []),
        ...(wine.varietals || []),
        ...(wine.tags || [])
      ].filter(Boolean);
      
      const hasMatch = searchableFields.some(field => 
        typeof field === 'string' && field.toLowerCase().includes(keyword)
      );
      
      if (!hasMatch) return false;
    }
    return true;
  });
}

export function getWineTypes(): WineType[] {
  return ['red', 'white', 'rosé', 'sparkling', 'dessert', 'fortified'];
}

export function getUniqueRegions(): string[] {
  const regions = getAllWines().map(wine => wine.region);
  return [...new Set(regions)].sort();
}

export function getUniqueCountries(): string[] {
  const countries = getAllWines()
    .map(wine => wine.country)
    .filter(Boolean) as string[];
  return [...new Set(countries)].sort();
}

export function getWineTypeColor(type: WineType): string {
  const colors = {
    red: 'text-red-600 bg-red-50 border-red-200',
    white: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'rosé': 'text-pink-600 bg-pink-50 border-pink-200',
    sparkling: 'text-purple-600 bg-purple-50 border-purple-200',
    dessert: 'text-amber-600 bg-amber-50 border-amber-200',
    fortified: 'text-orange-600 bg-orange-50 border-orange-200',
  };
  return colors[type];
}

export function validateCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
} 