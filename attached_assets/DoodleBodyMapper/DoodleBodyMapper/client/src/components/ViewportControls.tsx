import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw, Grid3x3, MapPin } from 'lucide-react';
import { useSpotStore } from '@/stores/useSpotStore';
import { Badge } from '@/components/ui/badge';

export function ViewportControls() {
  const isPlacingSpot = useSpotStore(state => state.isPlacingSpot);
  const setPlacingMode = useSpotStore(state => state.setPlacingMode);

  return (
    <div className="absolute bottom-6 left-6 flex flex-col gap-2" data-testid="container-viewport-controls">
      <div className="bg-card/95 backdrop-blur-md border border-card-border rounded-md p-2 flex flex-col gap-2">
        <Button
          size="icon"
          variant={isPlacingSpot ? "default" : "ghost"}
          onClick={() => setPlacingMode(!isPlacingSpot)}
          data-testid="button-place-marker"
          className="relative"
        >
          <MapPin className="h-5 w-5" />
          {isPlacingSpot && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse" />
          )}
        </Button>
        
        <div className="h-px bg-border" />
        
        <Button
          size="icon"
          variant="ghost"
          onClick={() => console.log('Reset view')}
          data-testid="button-reset-view"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={() => console.log('Zoom in')}
          data-testid="button-zoom-in"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={() => console.log('Zoom out')}
          data-testid="button-zoom-out"
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={() => console.log('Toggle grid')}
          data-testid="button-toggle-grid"
        >
          <Grid3x3 className="h-5 w-5" />
        </Button>
      </div>
      
      {isPlacingSpot && (
        <Badge variant="default" className="w-fit">
          Click on model to place marker
        </Badge>
      )}
    </div>
  );
}
