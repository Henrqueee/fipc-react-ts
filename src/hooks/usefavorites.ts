import { useState, useEffect } from 'react';
import type { VehicleResult } from '../store/useVehicleStore';

type FavoriteVehicle = Omit<VehicleResult, 'id' | 'date'> & {
  id?: string;
};

type FavoriteResult = {
  success: boolean;
  message: string;
};

const FAVORITES_STORAGE_KEY = 'fipc_favorites';

const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteVehicle[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (vehicle: FavoriteVehicle): FavoriteResult => {
    // Check if vehicle already exists in favorites
    const existingVehicle = favorites.find(
      (fav) =>
        fav.vehicleType === vehicle.vehicleType &&
        fav.brand === vehicle.brand &&
        fav.model === vehicle.model &&
        fav.year === vehicle.year
    );

    if (existingVehicle) {
      return {
        success: false,
        message: 'Este veículo já está nos seus favoritos!',
      };
    }

    // Add new vehicle to favorites with a unique ID
    const newFavorite = {
      ...vehicle,
      id: Date.now().toString(),
    };

    setFavorites((prev) => [...prev, newFavorite]);

    return {
      success: true,
      message: 'Veículo adicionado aos favoritos com sucesso!',
    };
  };

  const removeFromFavorites = (id: string): FavoriteResult => {
    const initialLength = favorites.length;
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));

    return {
      success: initialLength > favorites.length,
      message:
        initialLength > favorites.length
          ? 'Veículo removido dos favoritos!'
          : 'Veículo não encontrado nos favoritos.',
    };
  };

  const clearAllFavorites = (): FavoriteResult => {
    setFavorites([]);
    return {
      success: true,
      message: 'Todos os favoritos foram removidos!',
    };
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearAllFavorites,
  };
};

export default useFavorites;