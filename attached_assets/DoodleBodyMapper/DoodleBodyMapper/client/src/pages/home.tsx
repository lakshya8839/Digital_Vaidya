import { BodyModel3D } from '@/components/BodyModel3D';
import { ViewportControls } from '@/components/ViewportControls';
import { SpotList } from '@/components/SpotList';
import { SpotForm } from '@/components/SpotForm';
import { ExportPanel } from '@/components/ExportPanel';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Save, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-background">
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Body Spot Analyzer</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="default" data-testid="button-save-project">
              <Save className="h-4 w-4 mr-2" />
              Save Project
            </Button>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 relative">
          <BodyModel3D />
          <ViewportControls />
        </main>
      </div>

      <aside className="w-96 border-l border-border flex flex-col bg-card">
        <Tabs defaultValue="spots" className="flex-1 flex flex-col">
          <div className="border-b border-border px-6 pt-4">
            <TabsList className="w-full">
              <TabsTrigger value="spots" className="flex-1" data-testid="tab-spots">
                Spots
              </TabsTrigger>
              <TabsTrigger value="edit" className="flex-1" data-testid="tab-edit">
                Edit
              </TabsTrigger>
              <TabsTrigger value="export" className="flex-1" data-testid="tab-export">
                Export
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="spots" className="flex-1 m-0">
            <SpotList />
          </TabsContent>

          <TabsContent value="edit" className="flex-1 m-0 overflow-y-auto">
            <SpotForm />
          </TabsContent>

          <TabsContent value="export" className="flex-1 m-0 overflow-y-auto">
            <ExportPanel />
          </TabsContent>
        </Tabs>
      </aside>
    </div>
  );
}
