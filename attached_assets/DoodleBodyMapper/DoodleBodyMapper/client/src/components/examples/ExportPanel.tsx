import { ExportPanel } from '../ExportPanel';
import { useSpotStore } from '@/stores/useSpotStore';
import { useEffect } from 'react';

export default function ExportPanelExample() {
  const addSpot = useSpotStore(state => state.addSpot);
  
  useEffect(() => {
    addSpot({
      id: 'export-demo-1',
      label: 'Sample Mole',
      category: 'Mole',
      bodyRegion: 'Chest',
      positionX: 0.2,
      positionY: 1.3,
      positionZ: 0.1,
      normalX: 0,
      normalY: 1,
      normalZ: 0,
      color: '#ef4444',
      notes: 'Regular checkup',
      createdAt: new Date()
    });
  }, [addSpot]);

  return (
    <div className="w-96">
      <ExportPanel />
    </div>
  );
}
