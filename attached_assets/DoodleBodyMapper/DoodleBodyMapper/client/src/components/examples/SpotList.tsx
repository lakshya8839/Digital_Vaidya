import { SpotList } from '../SpotList';
import { useSpotStore } from '@/stores/useSpotStore';
import { useEffect } from 'react';

export default function SpotListExample() {
  const addSpot = useSpotStore(state => state.addSpot);
  
  useEffect(() => {
    addSpot({
      id: 'demo-1',
      label: 'Mole on shoulder',
      category: 'Mole',
      bodyRegion: 'Chest',
      positionX: 0.2,
      positionY: 1.3,
      positionZ: 0.1,
      normalX: 0,
      normalY: 1,
      normalZ: 0,
      color: '#ef4444',
      notes: 'Regular checkup required',
      createdAt: new Date()
    });
    
    addSpot({
      id: 'demo-2',
      label: 'Birthmark',
      category: 'Birthmark',
      bodyRegion: 'Abdomen',
      positionX: -0.1,
      positionY: 0.5,
      positionZ: 0.15,
      normalX: 0,
      normalY: 1,
      normalZ: 0,
      color: '#8b5cf6',
      notes: null,
      createdAt: new Date()
    });
  }, [addSpot]);

  return (
    <div className="h-96 w-96 border rounded-md">
      <SpotList />
    </div>
  );
}
