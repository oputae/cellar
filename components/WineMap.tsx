'use client';

import dynamic from 'next/dynamic';
import { Wine } from '@/types/wine';

// Dynamically import the entire map component to prevent SSR issues
const WineMapComponent = dynamic(() => import('./WineMapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

interface WineMapProps {
  wines: Wine[];
  onWineSelect?: (wine: Wine) => void;
}

export default function WineMap({ wines, onWineSelect }: WineMapProps) {
  return <WineMapComponent wines={wines} onWineSelect={onWineSelect} />;
} 