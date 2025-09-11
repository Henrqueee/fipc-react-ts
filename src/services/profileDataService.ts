import { authService } from './authService';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
}

interface ProfileDataService {
  updateUser(userData: Partial<ProfileData>): Promise<void>;
  changePassword(currentPassword: string, newPassword: string): Promise<void>;
}

class ProfileDataServiceImpl implements ProfileDataService {
  async updateUser(userData: Partial<ProfileData>): Promise<void> {
    await authService.updateUser(userData);
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await authService.changePassword(currentPassword, newPassword);
  }
}

export const profileDataService = new ProfileDataServiceImpl();