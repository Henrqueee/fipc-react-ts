import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface VehicleData {
  vehicleType: string;
  brand: string;
  model: string;
  year: string;
  fuel: string;
}

export interface VehicleResult extends VehicleData {
  price: string;
  month: string;
  date: string;
  id: string;
}

interface VehicleStore {
  isLoading: boolean;
  error: string | null;
  currentSearch: VehicleData;
  searchVehicle: (plate: string) => Promise<VehicleData | null>;
  updateCurrentSearch: (data: Partial<VehicleData>) => void;
  resetCurrentSearch: () => void;
}

const initialSearchData: VehicleData = {
  vehicleType: '',
  brand: '',
  model: '',
  year: '',
  fuel: '',
};

export const useVehicleStore = create<VehicleStore>()(
  (set, get) => ({
    isLoading: false,
    error: null,
    currentSearch: initialSearchData,

    updateCurrentSearch: (data: Partial<VehicleData>) => {
      set((state) => ({
        currentSearch: { ...state.currentSearch, ...data }
      }));
    },

    resetCurrentSearch: () => {
      set({ currentSearch: initialSearchData });
    },

    searchVehicle: async (plate: string): Promise<VehicleData | null> => {
      set({ isLoading: true, error: null });
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data for demonstration
        const mockData: VehicleData = {
          vehicleType: 'Car',
          brand: 'Toyota',
          model: 'Corolla',
          year: '2020',
          fuel: 'Gasoline',
        };
        
        set({ isLoading: false });
        return mockData;
      } catch (error) {
        set({ 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Search failed' 
        });
        return null;
      }
    },
  })
);