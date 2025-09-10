import { useState, useEffect } from 'react';
import type { VehicleResult } from '../store/useVehicleStore';
import { storage } from '../services';

export type FavoriteVehicle = Omit<VehicleResult, 'id' | 'date'> & {
  id: string;
};

type FavoriteResult = {
  success: boolean;
  message: string;
};

const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteVehicle[]>(() => 
    storage.getFavorites<FavoriteVehicle>() || []
  );

  // Save to storage whenever favorites change
  useEffect(() => {
    storage.setFavorites(favorites);
  }, [favorites]);

  const addToFavorites = (vehicle: Omit<FavoriteVehicle, 'id'>): FavoriteResult => {
    const isDuplicate = favorites.some(
      (fav) =>
        fav.vehicleType === vehicle.vehicleType &&
        fav.brand === vehicle.brand &&
        fav.model === vehicle.model &&
        fav.year === vehicle.year
    );

    if (isDuplicate) {
      return {
        success: false,
        message: 'Vehicle already in favorites!',
      };
    }

    const newFavorite: FavoriteVehicle = {
      ...vehicle,
      id: `fav-${Date.now()}`,
    };

    setFavorites((prev) => [...prev, newFavorite]);

    return {
      success: true,
      message: 'Vehicle added to favorites successfully!',
    };
  };

  const removeFromFavorites = (id: string): FavoriteResult => {
    const vehicleExists = favorites.some((fav) => fav.id === id);
    
    if (!vehicleExists) {
      return {
        success: false,
        message: 'Vehicle not found in favorites.',
      };
    }

    setFavorites((prev) => prev.filter((fav) => fav.id !== id));

    return {
      success: true,
      message: 'Vehicle removed from favorites!',
    };
  };

  const clearAllFavorites = (): FavoriteResult => {
    setFavorites([]);
    return {
      success: true,
      message: 'All favorites cleared!',
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