export interface WineCoordinates {
  lat: number;
  lng: number;
}

export type WineType = 'red' | 'white' | 'rosé' | 'sparkling' | 'dessert' | 'fortified';

export type TanninLevel = 'low' | 'medium-low' | 'medium' | 'medium-high' | 'high';
export type BodyLevel = 'light' | 'medium-light' | 'medium' | 'medium-full' | 'full';
export type AcidityLevel = 'low' | 'medium-low' | 'medium' | 'medium-high' | 'high';
export type WineStatus = 'cellar' | 'consumed';

export interface Wine {
  id: string;
  name: string;
  vintage: number;
  type: WineType;
  region: string;
  country?: string;
  winery?: string;
  coordinates: WineCoordinates;
  notes?: string;
  aromas?: string[];
  varietals?: string[];
  alcohol?: number;
  tannins?: TanninLevel;
  body?: BodyLevel;
  acidity?: AcidityLevel;
  favorite: boolean;
  status: WineStatus;
  tags?: string[];
  details?: string;
}

export interface WineFilter {
  type?: WineType;
  favorite?: boolean;
  region?: string;
  country?: string;
  keyword?: string;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
} 