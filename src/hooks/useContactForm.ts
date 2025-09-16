import { useState, useCallback } from 'react';
import { contactValidationService } from '../services/contactValidationService';
import type { ContactFormData, ContactFieldName } from '../types/contactTypes';

interface UseContactFormReturn {
  values: ContactFormData;
  errors: Record<string, string | null>;
  touched: Record<keyof ContactFormData, boolean>;
  isValid: boolean;
  handleChange: (field: ContactFieldName, value: string) => void;
  handleBlur: (field: ContactFieldName) => void;
  reset: () => void;
  setFieldError: (field: ContactFieldName, error: string | null) => void;
  validateField: (field: ContactFieldName) => void;
  validateForm: () => boolean;
}

const initialValues: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

const initialTouched: Record<keyof ContactFormData, boolean> = {
  name: false,
  email: false,
  subject: false,
  message: false
};

const initialErrors: Record<string, string | null> = {
  name: null,
  email: null,
  subject: null,
  message: null
};

export const useContactForm = (): UseContactFormReturn => {
  const [values, setValues] = useState<ContactFormData>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | null>>(initialErrors);
  const [touched, setTouched] = useState<Record<keyof ContactFormData, boolean>>(initialTouched);

  const handleChange = useCallback((field: ContactFieldName, value: string) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  }, [errors]);

  const handleBlur = useCallback((field: ContactFieldName) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Validate field on blur
    const error = contactValidationService.validateField(field, values[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }, [values]);

  const validateField = useCallback((field: ContactFieldName) => {
    const error = contactValidationService.validateField(field, values[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }, [values]);

  const validateForm = useCallback((): boolean => {
    const formErrors = contactValidationService.validateContactForm(values);
    
    // Convert to the expected format
    const errorRecord: Record<string, string | null> = {};
    Object.entries(formErrors).forEach(([key, value]) => {
      errorRecord[key] = value || null;
    });
    
    setErrors(errorRecord);
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    return Object.keys(formErrors).length === 0;
  }, [values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors(initialErrors);
    setTouched(initialTouched);
  }, []);

  const setFieldError = useCallback((field: ContactFieldName, error: string | null) => {
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }, []);

  // Calculate if form is valid
  const isValid = contactValidationService.isFormValid(values) && 
    Object.values(errors).every(error => error === null);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    reset,
    setFieldError,
    validateField,
    validateForm
  };
};