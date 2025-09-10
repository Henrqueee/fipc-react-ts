import { useNavigate, useLocation } from 'react-router-dom';
import type { Location } from 'react-router-dom';

interface NavigationState {
  vehicleType?: string;
  [key: string]: any;
}

interface UseNavigationReturn {
  navigate: (path: string, state?: NavigationState) => void;
  navigateWithScroll: (path: string, state?: NavigationState, scrollTarget?: string) => void;
  currentLocation: Location;
  getNavigationState: <T = NavigationState>() => T | null;
}

const useNavigation = (): UseNavigationReturn => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string, state?: NavigationState) => {
    navigate(path, { state });
  };

  const handleNavigateWithScroll = (
    path: string, 
    state?: NavigationState, 
    scrollTarget: string = '[class*="searchSection"]'
  ) => {
    navigate(path, { state });
    setTimeout(() => {
      const targetElement = document.querySelector(scrollTarget);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const getNavigationState = <T = NavigationState>(): T | null => {
    return (location.state as T) || null;
  };

  return {
    navigate: handleNavigate,
    navigateWithScroll: handleNavigateWithScroll,
    currentLocation: location,
    getNavigationState
  };
};

export default useNavigation;