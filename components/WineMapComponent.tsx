'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import L from 'leaflet';
import { Wine } from '@/types/wine';
import { getWineTypeColor } from '@/utils/wine';
import 'leaflet.fullscreen/Control.FullScreen.js';
import 'leaflet.fullscreen/Control.FullScreen.css';

interface WineMapComponentProps {
  wines: Wine[];
  onWineSelect?: (wine: Wine) => void;
}

export default function WineMapComponent({ wines, onWineSelect }: WineMapComponentProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  // Removed: const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Dynamically add Leaflet and MarkerCluster CSS to <head>
    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(leafletCSS);

    const clusterCSS = document.createElement('link');
    clusterCSS.rel = 'stylesheet';
    clusterCSS.href = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css';
    document.head.appendChild(clusterCSS);

    const clusterDefaultCSS = document.createElement('link');
    clusterDefaultCSS.rel = 'stylesheet';
    clusterDefaultCSS.href = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css';
    document.head.appendChild(clusterDefaultCSS);

    // Fix for default markers in Next.js
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  // Custom marker icons for different wine types
  const createWineIcon = (type: string) => {
    const colors = {
      red: '#dc2626',
      white: '#eab308',
      'rosé': '#ec4899',
      sparkling: '#9333ea',
      dessert: '#d97706',
      fortified: '#ea580c',
    };

    return L.divIcon({
      className: 'wine-marker',
      html: `
        <div style="
          width: 20px;
          height: 20px;
          background-color: ${colors[type as keyof typeof colors] || '#6b7280'};
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: white;
          font-weight: bold;
        ">
          ${type.charAt(0).toUpperCase()}
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  // Map controls component
  function MapControls() {
    const map = useMap();

    useEffect(() => {
      // Add zoom control
      const zoomControl = L.control.zoom({
        position: 'bottomright',
      });
      zoomControl.addTo(map);

      // Add fullscreen control
      const fullscreenControl = L.control.fullscreen({
        position: 'topright',
        title: {
          'false': 'View Fullscreen',
          'true': 'Exit Fullscreen'
        }
      });
      fullscreenControl.addTo(map);

      return () => {
        map.removeControl(zoomControl);
        map.removeControl(fullscreenControl);
      };
    }, [map]);

    return null;
  }

  const center: [number, number] = [20, 0]; // Center of the world
  const initialZoom = 2; // Much more zoomed out to show the world

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={initialZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={60}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          zoomToBoundsOnClick={true}
        >
          {wines.map((wine) => (
            <Marker
              key={wine.id}
              position={[wine.coordinates.lat, wine.coordinates.lng]}
              icon={createWineIcon(wine.type)}
              eventHandlers={{
                click: () => onWineSelect?.(wine),
              }}
            >
              <Popup>
                <div className="wine-popup p-2">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {wine.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {wine.vintage} • {wine.region}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getWineTypeColor(wine.type)}`}>
                      {wine.type}
                    </span>
                  </div>
                  {wine.favorite && (
                    <div className="mt-2">
                      <span className="text-xs text-red-500">❤️ Favorite</span>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        
        <MapControls />
      </MapContainer>
    </div>
  );
} 