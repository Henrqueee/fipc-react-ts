import { useState, useEffect, useCallback } from 'react';
import type { FavoritesUIState, FavoritesUIActions } from '../types/favoritesTypes';
import type { FavoriteVehicle } from '../hooks/usefavorites';

interface UseFavoritesUIReturn extends FavoritesUIState, FavoritesUIActions {
  shouldShowClearButton: boolean;
  gridClassName: string;
  emptyStateMessage: string;
}

export const useFavoritesUI = (favorites: FavoriteVehicle[]): UseFavoritesUIReturn => {
  const [gridColumns, setGridColumns] = useState(3);
  const [isResponsive, setIsResponsive] = useState(true);

  const isEmpty = favorites.length === 0;
  const showGrid = !isEmpty;
  const showEmptyState = isEmpty;
  const shouldShowClearButton = favorites.length > 0;

  useEffect(() => {
    const updateGridColumns = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setGridColumns(1);
      } else if (width < 1024) {
        setGridColumns(2);
      } else {
        setGridColumns(3);
      }
    };

    updateGridColumns();
    window.addEventListener('resize', updateGridColumns);
    
    return () => {
      window.removeEventListener('resize', updateGridColumns);
    };
  }, []);

  const handleGridResize = useCallback((): void => {
    // This function can be called manually to trigger grid recalculation
    const width = window.innerWidth;
    if (width < 768) {
      setGridColumns(1);
    } else if (width < 1024) {
      setGridColumns(2);
    } else {
      setGridColumns(3);
    }
  }, []);

  const toggleView = useCallback((): void => {
    setIsResponsive(prev => !prev);
  }, []);

  useEffect(() => {
    if (isResponsive) {
      const cleanup = handleGridResize();
      return cleanup;
    }
  }, [isResponsive, handleGridResize]);

  const gridClassName = `grid gap-6 ${
    isResponsive 
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
      : `grid-cols-${gridColumns}`
  }`;

  const emptyStateMessage = 'No favorite vehicles found. Start adding vehicles to your favorites to see them here.';

  return {
    showGrid,
    showEmptyState,
    gridColumns,
    isResponsive,
    shouldShowClearButton,
    gridClassName,
    emptyStateMessage,
    handleGridResize,
    toggleView,
  };
};