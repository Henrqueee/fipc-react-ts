import { useForm } from './useForm';
import { VALIDATION_RULE_SETS } from '../services/validationService';
import { useAuthStore } from '../store/useAuthStore';

interface ProfileFormData extends Record<string, string> {
  name: string;
  email: string;
  phone: string;
  location: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

interface ProfileFormState {
  values: ProfileFormData;
  isValid: boolean;
  isSubmitting: boolean;
  handleChange: (field: keyof ProfileFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setFieldValue: (field: keyof ProfileFormData, value: string) => void;
}

export const useProfileForm = (onSubmit: (values: ProfileFormData) => Promise<void>): ProfileFormState => {
  const { user } = useAuthStore();
  
  const form = useForm<ProfileFormData>({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      location: '',
      currentPassword: '',
      password: '',
      confirmPassword: ''
    },
    validationRules: {
      name: VALIDATION_RULE_SETS.NAME,
      email: VALIDATION_RULE_SETS.EMAIL,
      phone: VALIDATION_RULE_SETS.PHONE,
      location: {
        required: false,
        minLength: 2,
        maxLength: 100
      },
      currentPassword: {
        required: false,
        custom: (value: string) => {
          if ((form.values.password || form.values.confirmPassword) && !value) {
            return 'Current password is required to change password';
          }
          return null;
        }
      },
      password: {
        required: false,
        minLength: 6,
        custom: (value: string) => {
          if (value && form.values.confirmPassword && value !== form.values.confirmPassword) {
            return 'Passwords do not match';
          }
          return null;
        }
      },
      confirmPassword: {
        required: false,
        custom: (value: string) => {
          if (form.values.password && value !== form.values.password) {
            return 'Passwords do not match';
          }
          return null;
        }
      }
    },
    onSubmit,
    enableToast: false
  });

  return {
    values: form.values,
    isValid: form.isValid,
    isSubmitting: form.isSubmitting,
    handleChange: form.handleChange,
    handleSubmit: form.handleSubmit,
    setFieldValue: form.setFieldValue
  };
};