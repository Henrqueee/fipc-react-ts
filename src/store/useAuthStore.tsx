import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService, type IUser, type ILoginCredentials } from '../services/authService';

interface IAuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: ILoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateUser: (userData: Partial<IUser>) => void;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar se usuário está logado ao inicializar
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      if (authService.isAuthenticated()) {
        const userData = authService.getCurrentUser();
        setUser(userData);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: ILoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      setUser(response.user);
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'message' in error 
        ? (error as { message: string }).message 
        : 'Erro ao fazer login';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
    } catch (error: unknown) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const updateUser = (userData: Partial<IUser>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  const value: IAuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    clearError,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = (): IAuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthStore deve ser usado dentro de um AuthProvider');
  }
  return context;
};