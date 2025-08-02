import { useState, useCallback } from 'react';

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

export const useFormValidation = <T extends Record<string, string>>(
  initialValues: T,
  validationRules: ValidationRules
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((name: string, value: string): string => {
    const rules = validationRules[name];
    if (!rules) return '';

    // Required validation
    if (rules.required && !value.trim()) {
      return 'Este campo é obrigatório';
    }

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      return `Mínimo de ${rules.minLength} caracteres`;
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Máximo de ${rules.maxLength} caracteres`;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Formato inválido';
    }

    // Custom validation
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
      const error = validateField(fieldName, values[fieldName] || '');
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField, validationRules]);

  const handleChange = useCallback((name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate field if it was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, values[name] || '');
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateField]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0 && 
    Object.keys(validationRules).every(key => 
      !validationRules[key].required || values[key]?.trim()
    );

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  };
};