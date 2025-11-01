import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SPOT_CATEGORIES, BODY_REGIONS } from '@shared/schema';
import { useSpotStore } from '@/stores/useSpotStore';

const spotFormSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  category: z.string(),
  bodyRegion: z.string(),
  color: z.string(),
  notes: z.string().optional(),
});

type SpotFormValues = z.infer<typeof spotFormSchema>;

export function SpotForm() {
  const selectedSpotId = useSpotStore(state => state.selectedSpotId);
  const spots = useSpotStore(state => state.spots);
  const updateSpot = useSpotStore(state => state.updateSpot);
  
  const selectedSpot = spots.find(s => s.id === selectedSpotId);

  const form = useForm<SpotFormValues>({
    resolver: zodResolver(spotFormSchema),
    defaultValues: {
      label: selectedSpot?.label || '',
      category: selectedSpot?.category || 'Mole',
      bodyRegion: selectedSpot?.bodyRegion || 'Chest',
      color: selectedSpot?.color || '#ef4444',
      notes: selectedSpot?.notes || '',
    },
  });

  const onSubmit = (data: SpotFormValues) => {
    if (selectedSpotId) {
      updateSpot(selectedSpotId, data);
      console.log('Updated spot:', data);
    }
  };

  if (!selectedSpot) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p className="text-sm">Select a spot to edit its details</p>
      </div>
    );
  }

  return (
    <div className="p-6 border-t border-border" data-testid="form-spot-details">
      <h3 className="text-lg font-medium mb-4">Edit Spot Details</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Mole on left arm"
                    data-testid="input-spot-label"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SPOT_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bodyRegion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body Region</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger data-testid="select-body-region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BODY_REGIONS.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marker Color</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      type="color"
                      className="w-20 h-10 p-1"
                      data-testid="input-color"
                      {...field}
                    />
                  </FormControl>
                  <Input
                    type="text"
                    className="flex-1"
                    value={field.value}
                    onChange={field.onChange}
                    data-testid="input-color-hex"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Additional observations..."
                    className="resize-none"
                    rows={3}
                    data-testid="textarea-notes"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" data-testid="button-save-spot">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
