export interface StorageService {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
  exists(key: string): boolean;
}

class LocalStorageService implements StorageService {
  private isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  getItem<T>(key: string): T | null {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available');
      return null;
    }

    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error parsing localStorage item "${key}":`, error);
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available');
      return;
    }

    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting localStorage item "${key}":`, error);
    }
  }

  removeItem(key: string): void {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available');
      return;
    }

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage item "${key}":`, error);
    }
  }

  clear(): void {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available');
      return;
    }

    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  exists(key: string): boolean {
    if (!this.isAvailable()) {
      return false;
    }

    return localStorage.getItem(key) !== null;
  }
}

// Storage keys constants
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  USERS: 'users',
  CREDENTIALS: 'credentials',
  FAVORITES: 'favorites'
} as const;

// Create and export the storage service instance
export const storageService = new LocalStorageService();

// Convenience functions for common operations
export const storage = {
  // Auth related
  getAuthToken: (): string | null => storageService.getItem<string>(STORAGE_KEYS.AUTH_TOKEN),
  setAuthToken: (token: string): void => storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, token),
  removeAuthToken: (): void => storageService.removeItem(STORAGE_KEYS.AUTH_TOKEN),

  // User data
  getUserData: <T>(): T | null => storageService.getItem<T>(STORAGE_KEYS.USER_DATA),
  setUserData: <T>(userData: T): void => storageService.setItem(STORAGE_KEYS.USER_DATA, userData),
  removeUserData: (): void => storageService.removeItem(STORAGE_KEYS.USER_DATA),

  // Users collection
  getUsers: <T>(): T[] => storageService.getItem<T[]>(STORAGE_KEYS.USERS) || [],
  setUsers: <T>(users: T[]): void => storageService.setItem(STORAGE_KEYS.USERS, users),

  // Credentials
  getCredentials: <T>(): T[] => storageService.getItem<T[]>(STORAGE_KEYS.CREDENTIALS) || [],
  setCredentials: <T>(credentials: T[]): void => storageService.setItem(STORAGE_KEYS.CREDENTIALS, credentials),

  // Favorites
  getFavorites: <T>(): T[] => storageService.getItem<T[]>(STORAGE_KEYS.FAVORITES) || [],
  setFavorites: <T>(favorites: T[]): void => storageService.setItem(STORAGE_KEYS.FAVORITES, favorites),

  // Clear auth data
  clearAuthData: (): void => {
    storageService.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    storageService.removeItem(STORAGE_KEYS.USER_DATA);
  }
};