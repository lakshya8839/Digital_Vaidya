import { SpotForm } from '../SpotForm';
import { useSpotStore } from '@/stores/useSpotStore';
import { useEffect } from 'react';

export default function SpotFormExample() {
  const addSpot = useSpotStore(state => state.addSpot);
  const selectSpot = useSpotStore(state => state.selectSpot);
  
  useEffect(() => {
    const spotId = 'demo-form-1';
    addSpot({
      id: spotId,
      label: 'Test Spot',
      category: 'Mole',
      bodyRegion: 'Chest',
      positionX: 0.2,
      positionY: 1.3,
      positionZ: 0.1,
      normalX: 0,
      normalY: 1,
      normalZ: 0,
      color: '#ef4444',
      notes: 'Sample notes',
      createdAt: new Date()
    });
    selectSpot(spotId);
  }, [addSpot, selectSpot]);

  return (
    <div className="w-96">
      <SpotForm />
    </div>
  );
}
