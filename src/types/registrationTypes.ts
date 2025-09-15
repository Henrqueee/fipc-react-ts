export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  city: string;
  state: string;
  password: string;
  confirmPassword: string;
}

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

export interface RegistrationValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  city?: string;
  state?: string;
  password?: string;
  confirmPassword?: string;
}

export interface RegistrationFormState {
  values: RegistrationFormData;
  errors: RegistrationValidationErrors;
  touched: Record<keyof RegistrationFormData, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
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

export interface RegistrationActionsState {
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
}

export interface RegistrationFormActions {
  handleChange: (field: keyof RegistrationFormData, value: string) => void;
  handleBlur: (field: keyof RegistrationFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetForm: () => void;
}

export interface RegistrationActions {
  submitRegistration: (userData: RegistrationUserData) => Promise<void>;
  resetState: () => void;
}

export type RegistrationFieldName = keyof RegistrationFormData;