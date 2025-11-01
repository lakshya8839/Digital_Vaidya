import { create } from 'zustand';
import type { Spot } from '@shared/schema';

interface SpotStore {
  spots: Spot[];
  selectedSpotId: string | null;
  isPlacingSpot: boolean;
  addSpot: (spot: Spot) => void;
  updateSpot: (id: string, updates: Partial<Spot>) => void;
  deleteSpot: (id: string) => void;
  selectSpot: (id: string | null) => void;
  setPlacingMode: (isPlacing: boolean) => void;
  clearAllSpots: () => void;
}

export const useSpotStore = create<SpotStore>((set) => ({
  spots: [],
  selectedSpotId: null,
  isPlacingSpot: false,
  
  addSpot: (spot) => set((state) => ({ 
    spots: [...state.spots, spot],
    isPlacingSpot: false 
  })),
  
  updateSpot: (id, updates) => set((state) => ({
    spots: state.spots.map(spot => 
      spot.id === id ? { ...spot, ...updates } : spot
    )
  })),
  
  deleteSpot: (id) => set((state) => ({
    spots: state.spots.filter(spot => spot.id !== id),
    selectedSpotId: state.selectedSpotId === id ? null : state.selectedSpotId
  })),
  
  selectSpot: (id) => set({ selectedSpotId: id }),
  
  setPlacingMode: (isPlacing) => set({ isPlacingSpot: isPlacing }),
  
  clearAllSpots: () => set({ spots: [], selectedSpotId: null })
}));
