import { storage } from './storageService';
import type { VehicleResult } from '../store/useVehicleStore';
import type { FavoriteVehicle } from '../hooks/usefavorites';

export interface FavoriteResult {
  success: boolean;
  message: string;
}

export interface FavoritesDataService {
  getFavorites(): FavoriteVehicle[];
  addToFavorites(vehicle: Omit<VehicleResult, 'id'>): FavoriteResult;
  removeFromFavorites(id: string): FavoriteResult;
  clearAllFavorites(): FavoriteResult;
  isFavorite(vehicleData: Partial<VehicleResult>): boolean;
}

class FavoritesDataServiceImpl implements FavoritesDataService {
  getFavorites(): FavoriteVehicle[] {
    return storage.getFavorites<FavoriteVehicle>();
  }

  addToFavorites(vehicle: Omit<VehicleResult, 'id'>): FavoriteResult {
    const favorites = this.getFavorites();
    
    const existingFavorite = favorites.find(
      (fav) =>
        fav.brand === vehicle.brand &&
        fav.model === vehicle.model &&
        fav.year === vehicle.year &&
        fav.fuel === vehicle.fuel
    );

    if (existingFavorite) {
      return {
        success: false,
        message: 'Vehicle is already in favorites.',
      };
    }

    const newFavorite: FavoriteVehicle = {
      ...vehicle,
      id: Date.now().toString(),
    };

    const updatedFavorites = [...favorites, newFavorite];
    storage.setFavorites(updatedFavorites);

    return {
      success: true,
      message: 'Vehicle added to favorites!',
    };
  }

  removeFromFavorites(id: string): FavoriteResult {
    const favorites = this.getFavorites();
    const vehicleExists = favorites.some((fav) => fav.id === id);
    
    if (!vehicleExists) {
      return {
        success: false,
        message: 'Vehicle not found in favorites.',
      };
    }

    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    storage.setFavorites(updatedFavorites);

    return {
      success: true,
      message: 'Vehicle removed from favorites!',
    };
  }

  clearAllFavorites(): FavoriteResult {
    storage.setFavorites([]);
    return {
      success: true,
      message: 'All favorites cleared!',
    };
  }

  isFavorite(vehicleData: Partial<VehicleResult>): boolean {
    const favorites = this.getFavorites();
    return favorites.some(
      (fav) =>
        fav.brand === vehicleData.brand &&
        fav.model === vehicleData.model &&
        fav.year === vehicleData.year &&
        fav.fuel === vehicleData.fuel
    );
  }
}

export const favoritesDataService = new FavoritesDataServiceImpl();