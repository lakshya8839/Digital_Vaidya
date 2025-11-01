import { useSpotStore } from '@/stores/useSpotStore';
import { Html } from '@react-three/drei';

export function SpotMarkers() {
  const spots = useSpotStore(state => state.spots);
  const selectedSpotId = useSpotStore(state => state.selectedSpotId);
  const selectSpot = useSpotStore(state => state.selectSpot);

  return (
    <>
      {spots.map((spot) => {
        const isSelected = spot.id === selectedSpotId;
        
        return (
          <group
            key={spot.id}
            position={[spot.positionX, spot.positionY, spot.positionZ]}
            onClick={(e) => {
              e.stopPropagation();
              selectSpot(spot.id);
            }}
          >
            <mesh>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial
                color={spot.color}
                emissive={isSelected ? spot.color : '#000000'}
                emissiveIntensity={isSelected ? 0.5 : 0}
              />
            </mesh>
            
            {isSelected && (
              <Html distanceFactor={10}>
                <div className="bg-popover/95 backdrop-blur-md border border-popover-border text-popover-foreground px-2 py-1 rounded-md text-xs whitespace-nowrap pointer-events-none">
                  {spot.label}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </>
  );
}
