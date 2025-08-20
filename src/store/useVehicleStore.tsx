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
  searchResult: VehicleResult | null;
  searchVehicle: () => Promise<VehicleResult | null>;
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
  const [searchResult, setSearchResult] = useState<VehicleResult | null>(null);

  const updateCurrentSearch = (data: Partial<VehicleData>) => {
    setCurrentSearch(prev => ({ ...prev, ...data }));
  };

  const resetCurrentSearch = () => {
    setCurrentSearch(initialSearchData);
  };

  const searchVehicle = async (): Promise<VehicleResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data for demonstration using current search data
      const mockResult: VehicleResult = {
        ...currentSearch,
        price: 'R$ 45.000,00',
        month: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
        date: new Date().toLocaleDateString('pt-BR'),
        id: Date.now().toString(),
      };
      
      setSearchResult(mockResult);
      setIsLoading(false);
      return mockResult;
    } catch (error) {
      setIsLoading(false);
      setError(error instanceof Error ? error.message : 'Falha na busca');
      return null;
    }
  };

  const value: VehicleContextType = {
    isLoading,
    error,
    currentSearch,
    searchResult,
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