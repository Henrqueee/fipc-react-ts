import { useState, useCallback } from 'react';
import { registrationValidationService } from '../services/registrationValidationService';
import { useRegistrationActions } from './useRegistrationActions';
import type { 
  RegistrationFormData
} from '../types/registrationTypes';
import type { 
  RegistrationFormState, 
  RegistrationFormActions,
  RegistrationFieldName 
} from '../types/registrationTypes';

const initialFormData: RegistrationFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  gender: '',
  city: '',
  state: '',
  password: '',
  confirmPassword: ''
};

const initialTouchedState: Record<keyof RegistrationFormData, boolean> = {
  firstName: false,
  lastName: false,
  email: false,
  phone: false,
  birthDate: false,
  gender: false,
  city: false,
  state: false,
  password: false,
  confirmPassword: false
};

export const useRegistrationForm = (): RegistrationFormState & RegistrationFormActions => {
  const { submitRegistration, isSubmitting } = useRegistrationActions();
  
  const [values, setValues] = useState<RegistrationFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<keyof RegistrationFormData, boolean>>(initialTouchedState);

  const validateField = useCallback((fieldName: RegistrationFieldName, value: string) => {
    const result = registrationValidationService.validateField(fieldName, value, values);
    return result.isValid ? null : result.message || null;
  }, [values]);

  const handleChange = useCallback((field: RegistrationFieldName, value: string) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));

    // Real-time validation
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    // Special case for confirm password when password changes
    if (field === 'password' && values.confirmPassword) {
      const confirmPasswordError = registrationValidationService.validateConfirmPassword(value, values.confirmPassword);
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmPasswordError.isValid ? null : (confirmPasswordError.message || null)
      }));
    }
  }, [validateField, values.confirmPassword]);

  const handleBlur = useCallback((field: RegistrationFieldName) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Validate on blur
    const error = validateField(field, values[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }, [validateField, values]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched(Object.keys(initialTouchedState).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {} as Record<keyof RegistrationFormData, boolean>));

    // Validate entire form
    const formErrors = registrationValidationService.validateForm(values);
    const errorRecord: Record<string, string | null> = {};
    
    // Convert RegistrationValidationErrors to Record<string, string | null>
    Object.entries(formErrors).forEach(([key, value]) => {
      errorRecord[key] = value || null;
    });
    
    setErrors(errorRecord);

    // Check if form is valid
    const isFormValid = Object.keys(formErrors).length === 0;

    if (isFormValid) {
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        birthDate: values.birthDate,
        gender: values.gender,
        city: values.city,
        state: values.state,
        password: values.password
      };

      await submitRegistration(userData);
    }
  }, [values, submitRegistration]);

  const resetForm = useCallback(() => {
    setValues(initialFormData);
    setErrors({});
    setTouched(initialTouchedState);
  }, []);

  // Calculate if form is valid
  const isValid = Object.keys(errors).every(key => !errors[key]) && 
                  Object.keys(values).every(key => values[key as keyof RegistrationFormData].trim() !== '');

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
};