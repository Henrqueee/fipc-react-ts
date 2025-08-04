import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

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

interface VehicleContextType {
  isLoading: boolean;
  error: string | null;
  currentSearch: VehicleData;
  searchVehicle: () => Promise<VehicleData | null>;
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

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

interface VehicleProviderProps {
  children: ReactNode;
}

export const VehicleProvider = ({ children }: VehicleProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSearch, setCurrentSearch] = useState<VehicleData>(initialSearchData);

  const updateCurrentSearch = (data: Partial<VehicleData>) => {
    setCurrentSearch(prev => ({ ...prev, ...data }));
  };

  const resetCurrentSearch = () => {
    setCurrentSearch(initialSearchData);
  };

  const searchVehicle = async (): Promise<VehicleData | null> => {
    setIsLoading(true);
    setError(null);
    
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
      
      setIsLoading(false);
      return mockData;
    } catch (error) {
      setIsLoading(false);
      setError(error instanceof Error ? error.message : 'Search failed');
      return null;
    }
  };

  const value: VehicleContextType = {
    isLoading,
    error,
    currentSearch,
    searchVehicle,
    updateCurrentSearch,
    resetCurrentSearch,
  };

  return (
    <VehicleContext.Provider value={value}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicleStore = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicleStore must be used within a VehicleProvider');
  }
  return context;
};