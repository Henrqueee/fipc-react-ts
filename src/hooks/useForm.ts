import { useState, useCallback } from 'react';
import useToast from './useToast';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules;
  onSubmit: (values: T) => Promise<void> | void;
  enableToast?: boolean;
}

export interface UseFormReturn<T> {
  values: T;
  errors: ValidationErrors;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  handleChange: (name: keyof T, value: string) => void;
  handleBlur: (name: keyof T) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  validateAll: () => boolean;
  reset: () => void;
  setFieldValue: (name: keyof T, value: string) => void;
  setFieldError: (name: keyof T, error: string) => void;
}

export const useForm = <T extends Record<string, string>>(
  options: UseFormOptions<T>
): UseFormReturn<T> => {
  const { initialValues, validationRules = {}, onSubmit, enableToast = true } = options;
  const { showToast } = useToast();
  
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: string, value: string): string => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && !value.trim()) return 'This field is required';
    if (rules.minLength && value.length < rules.minLength) return `Minimum ${rules.minLength} characters required`;
    if (rules.maxLength && value.length > rules.maxLength) return `Maximum ${rules.maxLength} characters allowed`;
    if (rules.pattern && !rules.pattern.test(value)) return 'Invalid format';
    if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) return customError;
    }

    return '';
  }, [validationRules]);

  const validateAll = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName as keyof T] || '');
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField, validationRules]);

  const handleChange = useCallback((name: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Always validate field on change to update isValid state
    const error = validateField(name as string, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name as string, values[name] || '');
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateField]);

  const setFieldValue = useCallback((name: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (isSubmitting) return;

    const isFormValid = validateAll();
    if (!isFormValid) {
      if (enableToast) {
        showToast('Please fix the form errors before submitting', 'error');
      }
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(values);
      if (enableToast) {
        showToast('Form submitted successfully', 'success');
      }
    } catch (error) {
      if (enableToast) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        showToast(errorMessage, 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, validateAll, onSubmit, values, enableToast, showToast]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid = Object.keys(validationRules).every(key => {
    const value = values[key as keyof T]?.trim() || '';
    const rule = validationRules[key];
    const error = errors[key];
    
    // If field is required, it must have a value
    if (rule.required && !value) return false;
    
    // If field has a value, it must not have errors
    if (value && error) return false;
    
    return true;
  });

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    validateAll,
    reset,
    setFieldValue,
    setFieldError,
  };
};