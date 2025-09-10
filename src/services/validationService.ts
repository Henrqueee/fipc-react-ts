export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => ValidationResult;
}

export interface FieldValidationRules {
  [fieldName: string]: ValidationRule;
}

class ValidationService {
  // Common validation patterns
  public static readonly PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
    NAME: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
    CITY: /^[a-zA-ZÀ-ÿ\s]{2,50}$/,
    STATE: /^[a-zA-ZÀ-ÿ\s]{2,50}$/
  } as const;

  // Individual field validators
  validateRequired(value: string, fieldName: string = 'Field'): ValidationResult {
    const isValid = value.trim().length > 0;
    return {
      isValid,
      message: isValid ? undefined : `${fieldName} is required`
    };
  }

  validateEmail(email: string): ValidationResult {
    if (!email.trim()) {
      return { isValid: false, message: 'Email is required' };
    }
    
    const isValid = ValidationService.PATTERNS.EMAIL.test(email);
    return {
      isValid,
      message: isValid ? undefined : 'Please enter a valid email address'
    };
  }

  validatePassword(password: string): ValidationResult {
    if (!password) {
      return { isValid: false, message: 'Password is required' };
    }

    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }

    return { isValid: true };
  }

  validatePasswordMatch(password: string, confirmPassword: string): ValidationResult {
    if (password !== confirmPassword) {
      return { isValid: false, message: 'Passwords do not match' };
    }
    return { isValid: true };
  }

  validatePhone(phone: string): ValidationResult {
    if (!phone.trim()) {
      return { isValid: true }; // Phone is optional in most cases
    }

    const isValid = ValidationService.PATTERNS.PHONE.test(phone);
    return {
      isValid,
      message: isValid ? undefined : 'Please enter a valid phone number'
    };
  }

  validateName(name: string, fieldName: string = 'Name'): ValidationResult {
    if (!name.trim()) {
      return { isValid: false, message: `${fieldName} is required` };
    }

    if (name.length < 2) {
      return { isValid: false, message: `${fieldName} must be at least 2 characters long` };
    }

    if (name.length > 50) {
      return { isValid: false, message: `${fieldName} must be less than 50 characters` };
    }

    const isValid = ValidationService.PATTERNS.NAME.test(name);
    return {
      isValid,
      message: isValid ? undefined : `${fieldName} contains invalid characters`
    };
  }

  validateMinLength(value: string, minLength: number, fieldName: string = 'Field'): ValidationResult {
    const isValid = value.length >= minLength;
    return {
      isValid,
      message: isValid ? undefined : `${fieldName} must be at least ${minLength} characters long`
    };
  }

  validateMaxLength(value: string, maxLength: number, fieldName: string = 'Field'): ValidationResult {
    const isValid = value.length <= maxLength;
    return {
      isValid,
      message: isValid ? undefined : `${fieldName} must be less than ${maxLength} characters`
    };
  }

  validatePattern(value: string, pattern: RegExp, message: string): ValidationResult {
    const isValid = pattern.test(value);
    return {
      isValid,
      message: isValid ? undefined : message
    };
  }

  validateDate(date: string, fieldName: string = 'Date'): ValidationResult {
    if (!date.trim()) {
      return { isValid: false, message: `${fieldName} is required` };
    }

    const dateObj = new Date(date);
    const isValid = !isNaN(dateObj.getTime());
    return {
      isValid,
      message: isValid ? undefined : `Please enter a valid ${fieldName.toLowerCase()}`
    };
  }

  validateAge(birthDate: string, minAge: number = 18): ValidationResult {
    const dateResult = this.validateDate(birthDate, 'Birth date');
    if (!dateResult.isValid) {
      return dateResult;
    }

    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate()) 
      ? age - 1 
      : age;

    const isValid = actualAge >= minAge;
    return {
      isValid,
      message: isValid ? undefined : `You must be at least ${minAge} years old`
    };
  }

  // Generic field validator using rules
  validateField(value: string, rules: ValidationRule, fieldName: string = 'Field'): ValidationResult {
    // Required validation
    if (rules.required) {
      const requiredResult = this.validateRequired(value, fieldName);
      if (!requiredResult.isValid) {
        return requiredResult;
      }
    }

    // Skip other validations if field is empty and not required
    if (!rules.required && !value.trim()) {
      return { isValid: true };
    }

    // Min length validation
    if (rules.minLength !== undefined) {
      const minLengthResult = this.validateMinLength(value, rules.minLength, fieldName);
      if (!minLengthResult.isValid) {
        return minLengthResult;
      }
    }

    // Max length validation
    if (rules.maxLength !== undefined) {
      const maxLengthResult = this.validateMaxLength(value, rules.maxLength, fieldName);
      if (!maxLengthResult.isValid) {
        return maxLengthResult;
      }
    }

    // Pattern validation
    if (rules.pattern) {
      const patternResult = this.validatePattern(value, rules.pattern, `${fieldName} format is invalid`);
      if (!patternResult.isValid) {
        return patternResult;
      }
    }

    // Custom validation
    if (rules.custom) {
      const customResult = rules.custom(value);
      if (!customResult.isValid) {
        return customResult;
      }
    }

    return { isValid: true };
  }

  // Validate multiple fields
  validateForm(data: Record<string, string>, rules: FieldValidationRules): Record<string, string> {
    const errors: Record<string, string> = {};

    Object.keys(rules).forEach(fieldName => {
      const value = data[fieldName] || '';
      const fieldRules = rules[fieldName];
      const result = this.validateField(value, fieldRules, fieldName);
      
      if (!result.isValid && result.message) {
        errors[fieldName] = result.message;
      }
    });

    return errors;
  }

  // Check if form is valid
  isFormValid(data: Record<string, string>, rules: FieldValidationRules): boolean {
    const errors = this.validateForm(data, rules);
    return Object.keys(errors).length === 0;
  }

  // Predefined validation rule sets
  static readonly RULE_SETS = {
    EMAIL: {
      required: true,
      pattern: ValidationService.PATTERNS.EMAIL
    },
    PASSWORD: {
      required: true,
      minLength: 6
    },
    REQUIRED_TEXT: {
      required: true,
      minLength: 1
    },
    OPTIONAL_TEXT: {
      required: false
    },
    NAME: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: ValidationService.PATTERNS.NAME
    },
    PHONE: {
      required: false,
      pattern: ValidationService.PATTERNS.PHONE
    },
    CITY: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: ValidationService.PATTERNS.CITY
    },
    STATE: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: ValidationService.PATTERNS.STATE
    },
    BIRTH_DATE: {
      required: true,
      custom: (value: string) => {
        const service = new ValidationService();
        return service.validateAge(value, 18);
      }
    }
  } as const;
}

// Create and export the validation service instance
export const validationService = new ValidationService();

// Export validation patterns for direct use
export const VALIDATION_PATTERNS = ValidationService.PATTERNS;

// Export rule sets for easy form setup
export const VALIDATION_RULE_SETS = ValidationService.RULE_SETS;