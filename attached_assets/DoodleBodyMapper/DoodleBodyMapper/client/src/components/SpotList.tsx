import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, MapPin } from 'lucide-react';
import { useSpotStore } from '@/stores/useSpotStore';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SpotList() {
  const spots = useSpotStore(state => state.spots);
  const selectedSpotId = useSpotStore(state => state.selectedSpotId);
  const selectSpot = useSpotStore(state => state.selectSpot);
  const deleteSpot = useSpotStore(state => state.deleteSpot);

  if (spots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center px-6">
        <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No spots marked yet</h3>
        <p className="text-sm text-muted-foreground">
          Click the marker button and then click on the 3D model to add spots
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-3 p-4" data-testid="container-spot-list">
        {spots.map((spot, index) => (
          <Card
            key={spot.id}
            className={`p-4 cursor-pointer transition-colors ${
              selectedSpotId === spot.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => selectSpot(spot.id)}
            data-testid={`card-spot-${spot.id}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-border flex-shrink-0"
                    style={{ backgroundColor: spot.color }}
                  />
                  <span className="font-medium text-sm truncate">{spot.label}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {spot.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {spot.bodyRegion}
                  </Badge>
                </div>
                
                <div className="text-xs font-mono text-muted-foreground">
                  <div>X: {spot.positionX.toFixed(2)}</div>
                  <div>Y: {spot.positionY.toFixed(2)}</div>
                  <div>Z: {spot.positionZ.toFixed(2)}</div>
                </div>
                
                {spot.notes && (
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {spot.notes}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Edit spot:', spot.id);
                  }}
                  data-testid={`button-edit-${spot.id}`}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSpot(spot.id);
                  }}
                  data-testid={`button-delete-${spot.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
