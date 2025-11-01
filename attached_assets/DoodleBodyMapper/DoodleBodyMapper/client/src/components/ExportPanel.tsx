import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Copy, FileJson, Trash2 } from 'lucide-react';
import { useSpotStore } from '@/stores/useSpotStore';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ExportPanel() {
  const spots = useSpotStore(state => state.spots);
  const clearAllSpots = useSpotStore(state => state.clearAllSpots);
  const { toast } = useToast();

  const jsonData = JSON.stringify(
    {
      version: '1.0',
      timestamp: new Date().toISOString(),
      totalSpots: spots.length,
      spots: spots.map(spot => ({
        id: spot.id,
        label: spot.label,
        category: spot.category,
        bodyRegion: spot.bodyRegion,
        position: {
          x: spot.positionX,
          y: spot.positionY,
          z: spot.positionZ,
        },
        normal: {
          x: spot.normalX,
          y: spot.normalY,
          z: spot.normalZ,
        },
        color: spot.color,
        notes: spot.notes,
        createdAt: spot.createdAt,
      })),
    },
    null,
    2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonData);
    toast({
      title: 'Copied to clipboard',
      description: 'JSON data has been copied successfully',
    });
  };

  const handleDownload = () => {
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `body-spots-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Download started',
      description: 'JSON file is being downloaded',
    });
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all spots? This cannot be undone.')) {
      clearAllSpots();
      toast({
        title: 'All spots cleared',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-6 border-t border-border" data-testid="panel-export">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileJson className="h-5 w-5" />
          <h3 className="text-lg font-medium">Export Data</h3>
        </div>
        <Badge variant="secondary">{spots.length} spots</Badge>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          onClick={handleCopy}
          variant="outline"
          className="flex-1"
          data-testid="button-copy-json"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        <Button
          onClick={handleDownload}
          variant="default"
          className="flex-1"
          data-testid="button-download-json"
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>

      <Card className="mb-4">
        <ScrollArea className="h-64">
          <pre className="text-xs font-mono p-4 overflow-x-auto">
            {jsonData}
          </pre>
        </ScrollArea>
      </Card>

      <Button
        onClick={handleClearAll}
        variant="destructive"
        className="w-full"
        data-testid="button-clear-all"
        disabled={spots.length === 0}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear All Spots
      </Button>
    </div>
  );
}
