import type { FavoriteVehicle } from '../hooks/usefavorites';
import type { ConfirmationOptions } from '../services/confirmationService';

export interface FavoritesState {
  favorites: FavoriteVehicle[];
  isLoading: boolean;
  isEmpty: boolean;
  hasError: boolean;
  errorMessage?: string;
}

export interface FavoritesActions {
  removeFavorite: (id: string) => Promise<void>;
  clearAllFavorites: () => Promise<void>;
  refreshFavorites: () => void;
}

export interface FavoritesUIState {
  showGrid: boolean;
  showEmptyState: boolean;
  gridColumns: number;
  isResponsive: boolean;
}

export interface FavoritesUIActions {
  handleGridResize: () => void;
  toggleView: () => void;
}

export interface RemoveFavoriteConfirmation extends ConfirmationOptions {
  vehicleInfo: {
    brand: string;
    model: string;
    year: string;
  };
}

export interface ClearAllConfirmation extends ConfirmationOptions {
  favoritesCount: number;
}

export type FavoritesActionType = 'remove' | 'clear_all';

export interface FavoritesActionResult {
  success: boolean;
  message: string;
  type: FavoritesActionType;
}