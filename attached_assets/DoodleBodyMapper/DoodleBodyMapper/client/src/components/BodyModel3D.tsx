import { useSpotStore } from '@/stores/useSpotStore';
import { Button } from '@/components/ui/button';
import { MapPin, Pointer } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export function BodyModel3D() {
  const addSpot = useSpotStore(state => state.addSpot);
  const isPlacingSpot = useSpotStore(state => state.isPlacingSpot);
  const setPlacingMode = useSpotStore(state => state.setPlacingMode);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Array<{ x: number; y: number; id: string }>>([]);

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      markers.forEach((marker) => {
        ctx.fillStyle = '#ef4444';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        ctx.arc(marker.x, marker.y, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [markers]);

  const determineBodyRegion = (x: number, y: number, width: number, height: number): string => {
    const normalizedY = y / height;
    const normalizedX = x / width;
    
    const centerX = 0.5;
    const shoulderWidth = 0.2;
    const bodyWidth = 0.15;
    
    if (normalizedY < 0.12) return 'Head';
    if (normalizedY < 0.18) return 'Neck';
    
    if (normalizedY < 0.35) {
      const distFromCenter = Math.abs(normalizedX - centerX);
      if (distFromCenter < bodyWidth) return 'Chest';
      if (normalizedX < centerX) return 'Left Shoulder';
      return 'Right Shoulder';
    }
    
    if (normalizedY < 0.42) {
      const distFromCenter = Math.abs(normalizedX - centerX);
      if (distFromCenter < shoulderWidth) return 'Chest';
      if (normalizedX < centerX) return 'Left Arm';
      return 'Right Arm';
    }
    
    if (normalizedY < 0.55) {
      const distFromCenter = Math.abs(normalizedX - centerX);
      if (distFromCenter < bodyWidth) return 'Abdomen';
      if (normalizedX < centerX) return 'Left Arm';
      return 'Right Arm';
    }
    
    if (normalizedY < 0.62) return 'Back';
    
    if (normalizedY < 0.88) {
      if (normalizedX < centerX) return 'Left Leg';
      return 'Right Leg';
    }
    
    if (normalizedX < centerX) return 'Left Foot';
    return 'Right Foot';
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPlacingSpot) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const bodyRegion = determineBodyRegion(x, y, rect.width, rect.height);
    const spotId = `spot-${Date.now()}`;

    const newSpot = {
      id: spotId,
      label: 'New Spot',
      category: 'Mole',
      bodyRegion: bodyRegion,
      positionX: (x / rect.width - 0.5) * 2,
      positionY: 1.5 - (y / rect.height) * 2,
      positionZ: 0,
      normalX: 0,
      normalY: 1,
      normalZ: 0,
      color: '#ef4444',
      notes: null,
      createdAt: new Date()
    };

    addSpot(newSpot);
    setMarkers([...markers, { x, y, id: spotId }]);
    setPlacingMode(false);
  };

  const handleTogglePlacing = () => {
    setPlacingMode(!isPlacingSpot);
  };

  return (
    <div className="w-full h-full flex flex-col bg-muted/30" data-testid="canvas-3d-viewport">
      <div className="p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold mb-1">3D Body Map</h3>
            <p className="text-xs text-muted-foreground">
              {isPlacingSpot 
                ? 'Click on the model to mark a spot' 
                : 'Rotate the model and click "Mark Spot" to add a new spot'}
            </p>
          </div>
          <Button 
            onClick={handleTogglePlacing}
            variant={isPlacingSpot ? 'default' : 'outline'}
            data-testid="button-toggle-marking"
            size="sm"
          >
            {isPlacingSpot ? (
              <>
                <Pointer className="h-4 w-4 mr-2" />
                Marking Mode
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Mark Spot
              </>
            )}
          </Button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden"
        style={{ minHeight: '400px' }}
      >
        <iframe 
          src="https://clara.io/embed/d49ee603-8e6c-4720-bd20-9e3d7b13978a?renderer=webgl" 
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          title="3D Body Model"
        />
        
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full ${
            isPlacingSpot ? 'cursor-crosshair' : 'pointer-events-none'
          }`}
          onClick={handleCanvasClick}
          style={{ 
            pointerEvents: isPlacingSpot ? 'auto' : 'none',
            touchAction: isPlacingSpot ? 'none' : 'auto'
          }}
        />
      </div>
    </div>
  );
}
