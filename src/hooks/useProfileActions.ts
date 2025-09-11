import { useState } from 'react';
import { profileDataService } from '../services/profileDataService';
import { useAuthStore } from '../store/useAuthStore';
import useToast from './useToast';

interface ProfileFormData extends Record<string, string> {
  name: string;
  email: string;
  phone: string;
  location: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

interface ProfileActionsState {
  isLoading: boolean;
  handleProfileUpdate: (formData: ProfileFormData) => Promise<void>;
}

export const useProfileActions = (): ProfileActionsState => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useAuthStore();
  const { showToast } = useToast();

  const handleProfileUpdate = async (formData: ProfileFormData): Promise<void> => {
    setIsLoading(true);
    
    try {
      const { currentPassword, password, confirmPassword, ...profileData } = formData;
      
      // Update profile data
      if (profileData.name || profileData.email || profileData.phone || profileData.location) {
        await profileDataService.updateUser(profileData);
        updateUser(profileData);
      }
      
      // Handle password change if provided
      if (currentPassword && password && confirmPassword) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        
        await profileDataService.changePassword(currentPassword, password);
        showToast('Password updated successfully!', 'success');
      } else if (profileData.name || profileData.email || profileData.phone || profileData.location) {
        showToast('Profile updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      showToast(errorMessage, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleProfileUpdate
  };
};