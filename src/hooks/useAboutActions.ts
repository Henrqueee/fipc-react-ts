import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AboutNavigationService } from '../services/aboutNavigationService';
import type { AboutActionsState } from '../types/aboutTypes';

interface UseAboutActionsReturn extends AboutActionsState {
  handleGoToQuery: () => Promise<void>;
  handleNavigateWithDelay: (route: string, delay?: number) => Promise<void>;
  resetActionState: () => void;
}

export const useAboutActions = (): UseAboutActionsReturn => {
  const navigate = useNavigate();
  const [state, setState] = useState<AboutActionsState>({
    isNavigating: false,
    navigationError: null,
    lastAction: null
  });

  const handleGoToQuery = async (): Promise<void> => {
    try {
      setState(prev => ({
        ...prev,
        isNavigating: true,
        navigationError: null,
        lastAction: 'navigateToQuery'
      }));

      await AboutNavigationService.navigateToQuery(navigate);

      setState(prev => ({
        ...prev,
        isNavigating: false,
        lastAction: 'navigateToQuery'
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isNavigating: false,
        navigationError: error instanceof Error ? error.message : 'Navigation failed',
        lastAction: 'navigateToQuery'
      }));
    }
  };

  const handleNavigateWithDelay = async (route: string, delay?: number): Promise<void> => {
    try {
      setState(prev => ({
        ...prev,
        isNavigating: true,
        navigationError: null,
        lastAction: 'navigateWithDelay'
      }));

      await AboutNavigationService.handleNavigationWithDelay(route, navigate, delay);

      setState(prev => ({
        ...prev,
        isNavigating: false,
        lastAction: 'navigateWithDelay'
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isNavigating: false,
        navigationError: error instanceof Error ? error.message : 'Navigation with delay failed',
        lastAction: 'navigateWithDelay'
      }));
    }
  };

  const resetActionState = (): void => {
    setState({
      isNavigating: false,
      navigationError: null,
      lastAction: null
    });
  };

  return {
    ...state,
    handleGoToQuery,
    handleNavigateWithDelay,
    resetActionState
  };
};