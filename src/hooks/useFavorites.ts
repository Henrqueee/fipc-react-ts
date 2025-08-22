import { useState, useCallback } from 'react';

export interface FavoriteVehicle {
  id: string;
  vehicleType: string;
  brand: string;
  model: string;
  year: string;
  fuel?: string;
  price?: string;
  month?: string;
}

export interface UseFavoritesReturn {
  favorites: FavoriteVehicle[];
  addToFavorites: (vehicle: Omit<FavoriteVehicle, 'id'>) => { success: boolean; message: string; isAlreadyFavorite?: boolean };
  removeFromFavorites: (vehicleId: string) => { success: boolean; message: string };
  isFavorite: (vehicle: Omit<FavoriteVehicle, 'id'>) => boolean;
  clearFavorites: () => void;
  getFavoritesCount: () => number;
}

const FAVORITES_STORAGE_KEY = 'fipc-favorites';

const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<FavoriteVehicle[]>(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error);
      return [];
    }
  });

  const saveFavoritesToStorage = useCallback((newFavorites: FavoriteVehicle[]) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao salvar favoritos no localStorage:', error);
    }
  }, []);

  const generateVehicleId = useCallback((vehicle: Omit<FavoriteVehicle, 'id'>): string => {
    return `${vehicle.vehicleType}-${vehicle.brand}-${vehicle.model}-${vehicle.year}-${vehicle.fuel || 'default'}`
      .toLowerCase()
      .replace(/\s+/g, '-');
  }, []);

  const addToFavorites = useCallback((vehicle: Omit<FavoriteVehicle, 'id'>) => {
    const vehicleId = generateVehicleId(vehicle);
    
    // Verificar se já existe nos favoritos
    const existingFavorite = favorites.find(fav => fav.id === vehicleId);
    
    if (existingFavorite) {
      return {
        success: false,
        message: 'Este veículo já está nos seus favoritos!',
        isAlreadyFavorite: true
      };
    }

    const newFavorite: FavoriteVehicle = {
      ...vehicle,
      id: vehicleId
    };

    const updatedFavorites = [...favorites, newFavorite];
    saveFavoritesToStorage(updatedFavorites);

    return {
      success: true,
      message: 'Veículo adicionado aos favoritos com sucesso!'
    };
  }, [favorites, generateVehicleId, saveFavoritesToStorage]);

  const removeFromFavorites = useCallback((vehicleId: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== vehicleId);
    
    if (updatedFavorites.length === favorites.length) {
      return {
        success: false,
        message: 'Veículo não encontrado nos favoritos!'
      };
    }

    saveFavoritesToStorage(updatedFavorites);

    return {
      success: true,
      message: 'Veículo removido dos favoritos!'
    };
  }, [favorites, saveFavoritesToStorage]);

  const isFavorite = useCallback((vehicle: Omit<FavoriteVehicle, 'id'>): boolean => {
    const vehicleId = generateVehicleId(vehicle);
    return favorites.some(fav => fav.id === vehicleId);
  }, [favorites, generateVehicleId]);

  const clearFavorites = useCallback(() => {
    saveFavoritesToStorage([]);
  }, [saveFavoritesToStorage]);

  const getFavoritesCount = useCallback((): number => {
    return favorites.length;
  }, [favorites]);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    getFavoritesCount
  };
};

export default useFavorites;