import { authService } from './authService';
import type { IRegisterData } from './authService';

export interface RegistrationUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  city: string;
  state: string;
  password: string;
}

export interface RegistrationResult {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

class RegistrationDataService {
  async registerUser(userData: RegistrationUserData): Promise<RegistrationResult> {
    try {
      const registerData: IRegisterData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password
      };

      const response = await authService.register(registerData);

      return {
        success: true,
        message: response.message,
        user: {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      
      return {
        success: false,
        message: errorMessage
      };
    }
  }

  async checkEmailAvailability(email: string): Promise<boolean> {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      return !existingUsers.some((user: any) => user.email === email);
    } catch (error) {
      return true;
    }
  }
}

export const registrationDataService = new RegistrationDataService();
export default registrationDataService;