export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
}

export interface ProfileFormData extends Record<string, string> {
  name: string;
  email: string;
  phone: string;
  location: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileUpdateData {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
}

export interface ProfileDataService {
  updateUser(userData: Partial<ProfileData>): Promise<void>;
  changePassword(currentPassword: string, newPassword: string): Promise<void>;
}

export interface ProfileFormState {
  values: ProfileFormData;
  isValid: boolean;
  isSubmitting: boolean;
  handleChange: (field: keyof ProfileFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setFieldValue: (field: keyof ProfileFormData, value: string) => void;
}

export interface AvatarUploadState {
  isUploading: boolean;
  handleImageUpload: (file: File) => Promise<void>;
}

export interface ProfileActionsState {
  isLoading: boolean;
  handleProfileUpdate: (formData: ProfileFormData) => Promise<void>;
}