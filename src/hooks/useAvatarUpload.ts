import { useState } from 'react';
import { profileDataService } from '../services/profileDataService';
import { useAuthStore } from '../store/useAuthStore';
import useToast from './useToast';

interface AvatarUploadState {
  isUploading: boolean;
  handleImageUpload: (file: File) => Promise<void>;
}

export const useAvatarUpload = (): AvatarUploadState => {
  const [isUploading, setIsUploading] = useState(false);
  const { updateUser } = useAuthStore();
  const { showToast } = useToast();

  const handleImageUpload = async (file: File): Promise<void> => {
    console.log('File upload attempt:', {
      name: file.name,
      size: file.size,
      type: file.type,
      sizeInMB: (file.size / (1024 * 1024)).toFixed(2)
    });

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file.', 'error');
      return;
    }

    // Increased size limit to 10MB to accommodate different browser behaviors
    if (file.size > 10 * 1024 * 1024) {
      showToast('Image size must be less than 10MB.', 'error');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    
    reader.onerror = () => {
      showToast('Failed to read image file.', 'error');
      setIsUploading(false);
    };
    
    reader.onload = async (e) => {
      try {
        const result = e.target?.result;
        if (!result || typeof result !== 'string') {
          throw new Error('Invalid image data');
        }
        
        const base64Image = result;
        
        // Save to localStorage via profileDataService
        await profileDataService.updateUser({ avatar: base64Image });
        
        // Update auth store
        updateUser({ avatar: base64Image });
        
        showToast('Profile picture updated!', 'success');
      } catch (error) {
        console.error('Error updating profile picture:', error);
        showToast('Failed to update profile picture.', 'error');
      } finally {
        setIsUploading(false);
      }
    };
    
    reader.readAsDataURL(file);
  };

  return {
    isUploading,
    handleImageUpload
  };
};