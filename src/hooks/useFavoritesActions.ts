import { useState, useCallback } from 'react';
import { favoritesDataService } from '../services/favoritesDataService';
import { confirmationService } from '../services/confirmationService';
import type { 
  FavoritesActions, 
  FavoritesActionResult, 
  RemoveFavoriteConfirmation,
  ClearAllConfirmation 
} from '../types/favoritesTypes';
import type { FavoriteVehicle } from '../hooks/usefavorites';

interface UseFavoritesActionsReturn extends FavoritesActions {
  isLoading: boolean;
  lastActionResult?: FavoritesActionResult;
}

export const useFavoritesActions = (
  favorites: FavoriteVehicle[],
  onFavoritesChange: () => void
): UseFavoritesActionsReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastActionResult, setLastActionResult] = useState<FavoritesActionResult>();

  const removeFavorite = useCallback(async (id: string): Promise<void> => {
    const vehicle = favorites.find(fav => fav.id === id);
    if (!vehicle) return;

    const confirmationOptions: RemoveFavoriteConfirmation = {
      title: 'Remove Favorite',
      message: `Are you sure you want to remove ${vehicle.brand} ${vehicle.model} (${vehicle.year}) from your favorites?`,
      confirmText: 'Remove',
      cancelText: 'Cancel',
      type: 'warning',
      vehicleInfo: {
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
      },
    };

    setIsLoading(true);
    
    try {
      const confirmation = await confirmationService.confirm(confirmationOptions);
      
      if (confirmation.confirmed) {
        const result = favoritesDataService.removeFromFavorites(id);
        
        setLastActionResult({
          success: result.success,
          message: result.message,
          type: 'remove',
        });

        if (result.success) {
          onFavoritesChange();
        }
      }
    } catch (error) {
      setLastActionResult({
        success: false,
        message: 'Failed to remove favorite',
        type: 'remove',
      });
    } finally {
      setIsLoading(false);
    }
  }, [favorites, onFavoritesChange]);

  const clearAllFavorites = useCallback(async (): Promise<void> => {
    if (favorites.length === 0) return;

    const confirmationOptions: ClearAllConfirmation = {
      title: 'Clear All Favorites',
      message: `Are you sure you want to remove all ${favorites.length} favorites? This action cannot be undone.`,
      confirmText: 'Clear All',
      cancelText: 'Cancel',
      type: 'danger',
      favoritesCount: favorites.length,
    };

    setIsLoading(true);
    
    try {
      const confirmation = await confirmationService.confirm(confirmationOptions);
      
      if (confirmation.confirmed) {
        const result = favoritesDataService.clearAllFavorites();
        
        setLastActionResult({
          success: result.success,
          message: result.message,
          type: 'clear_all',
        });

        if (result.success) {
          onFavoritesChange();
        }
      }
    } catch (error) {
      setLastActionResult({
        success: false,
        message: 'Failed to clear favorites',
        type: 'clear_all',
      });
    } finally {
      setIsLoading(false);
    }
  }, [favorites.length, onFavoritesChange]);

  const refreshFavorites = useCallback((): void => {
    onFavoritesChange();
  }, [onFavoritesChange]);

  return {
    removeFavorite,
    clearAllFavorites,
    refreshFavorites,
    isLoading,
    lastActionResult,
  };
};