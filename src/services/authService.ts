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

export interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
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
  // Registro de usuário
  async register(data: IRegisterData): Promise<IAuthResponse> {
    try {
      // Verificar se o email já está cadastrado
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = existingUsers.some((user: any) => user.email === data.email);
      
      if (emailExists) {
        throw new Error('Este email já está cadastrado');
      }
      
      // Criar novo usuário
      const newUser: IUser = {
        id: Date.now().toString(),
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        createdAt: new Date().toISOString()
      };
      
      // Adicionar novo usuário
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Salvar credenciais para login
      const credentials = {
        email: data.email,
        password: data.password
      };
      
      const existingCredentials = JSON.parse(localStorage.getItem('credentials') || '[]');
      const updatedCredentials = [...existingCredentials, credentials];
      localStorage.setItem('credentials', JSON.stringify(updatedCredentials));
      
      // Gerar token e retornar resposta
      const token = 'register-token-' + Date.now();
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      return {
        user: newUser,
        token,
        message: 'Cadastro realizado com sucesso'
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }
  // Login do usuário
  async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
    try {
      // Verificar credenciais no localStorage
      const savedCredentials = JSON.parse(localStorage.getItem('credentials') || '[]');
      const userCredential = savedCredentials.find(
        (cred: ILoginCredentials) => cred.email === credentials.email && cred.password === credentials.password
      );
      
      // Verificar usuário demo
      const isDemoUser = credentials.email === 'demo@fipe.com' && credentials.password === '123456';
      
      if (userCredential || isDemoUser) {
        let user: IUser;
        
        if (isDemoUser) {
          // Usuário demo
          user = {
            id: '1',
            name: 'Usuário Demo',
            email: credentials.email,
            avatar: '',
            createdAt: new Date().toISOString(),
          };
        } else {
          // Usuário registrado
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const foundUser = users.find((u: IUser) => u.email === credentials.email);
          
          if (!foundUser) {
            throw new Error('Usuário não encontrado');
          }
          
          user = foundUser;
        }
        
        const response: IAuthResponse = {
          user,
          token: 'auth-token-' + Date.now(),
          message: 'Login realizado com sucesso',
        };
        
        // Salvar dados no localStorage
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        
        return response;
      } else {
        throw new Error('Credenciais inválidas');
      }
      
      // Código real para quando a API estiver pronta:
      // const response = await api.post<IAuthResponse>('/auth/login', credentials);
      // localStorage.setItem('authToken', response.data.token);
      // localStorage.setItem('userData', JSON.stringify(response.data.user));
      // return response.data;
    } catch (error: unknown) {
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
  private handleError(error: unknown): IApiError {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: IApiError } };
      if (axiosError.response?.data) {
        return axiosError.response.data;
      }
    }
    
    if (error && typeof error === 'object' && 'message' in error) {
      const errorWithMessage = error as { message: string };
      return { message: errorWithMessage.message };
    }
    
    return { message: 'Erro interno do servidor' };
  }
}

// Instância única do serviço
export const authService = new AuthService();
export default authService;