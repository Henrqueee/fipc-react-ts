import axios from 'axios';

// Base URL da API (será configurada quando a API estiver pronta)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Configuração do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Interfaces
export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
  message: string;
}

export interface IApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Serviço de Autenticação
class AuthService {
  // Login do usuário
  async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
    try {
      // Simulação temporária até a API estar pronta
      if (credentials.email === 'demo@fipe.com' && credentials.password === '123456') {
        const mockResponse: IAuthResponse = {
          user: {
            id: '1',
            name: 'Usuário Demo',
            email: credentials.email,
            avatar: '',
            createdAt: new Date().toISOString(),
          },
          token: 'mock-jwt-token-' + Date.now(),
          message: 'Login realizado com sucesso',
        };
        
        // Salvar dados no localStorage
        localStorage.setItem('authToken', mockResponse.token);
        localStorage.setItem('userData', JSON.stringify(mockResponse.user));
        
        return mockResponse;
      } else {
        throw new Error('Credenciais inválidas');
      }
      
      // Código real para quando a API estiver pronta:
      // const response = await api.post<IAuthResponse>('/auth/login', credentials);
      // localStorage.setItem('authToken', response.data.token);
      // localStorage.setItem('userData', JSON.stringify(response.data.user));
      // return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Logout do usuário
  async logout(): Promise<void> {
    try {
      // Quando a API estiver pronta:
      // await api.post('/auth/logout');
    } catch (error) {
      console.warn('Erro ao fazer logout na API:', error);
    } finally {
      // Limpar dados locais
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
  }

  // Verificar se usuário está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    return !!(token && userData);
  }

  // Obter dados do usuário logado
  getCurrentUser(): IUser | null {
    try {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      return null;
    }
  }

  // Obter token de autenticação
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Tratamento de erros
  private handleError(error: any): IApiError {
    if (error.response?.data) {
      return error.response.data;
    }
    
    if (error.message) {
      return { message: error.message };
    }
    
    return { message: 'Erro interno do servidor' };
  }
}

// Instância única do serviço
export const authService = new AuthService();
export default authService;