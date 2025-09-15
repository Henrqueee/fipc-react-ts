import { validationService, VALIDATION_RULE_SETS } from './validationService';
import type { ValidationResult } from './validationService';

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

class RegistrationValidationService {
  validateFirstName(value: string): ValidationResult {
    return validationService.validateField(value, VALIDATION_RULE_SETS.NAME, 'First Name');
  }

  validateLastName(value: string): ValidationResult {
    return validationService.validateField(value, VALIDATION_RULE_SETS.NAME, 'Last Name');
  }

  validateEmail(value: string): ValidationResult {
    return validationService.validateField(value, VALIDATION_RULE_SETS.EMAIL, 'Email');
  }

  validatePhone(value: string): ValidationResult {
    return validationService.validateField(value, VALIDATION_RULE_SETS.PHONE, 'Phone');
  }

  validateBirthDate(value: string): ValidationResult {
    if (!value) {
      return { isValid: false, message: 'Birth date is required' };
    }

    const date = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate()) 
      ? age - 1 
      : age;

    if (actualAge < 18) {
      return { isValid: false, message: 'You must be at least 18 years old' };
    }

    if (actualAge > 120) {
      return { isValid: false, message: 'Please enter a valid birth date' };
    }

    return { isValid: true };
  }

  validateGender(value: string): ValidationResult {
    return validationService.validateField(value, VALIDATION_RULE_SETS.OPTIONAL_TEXT, 'Gender');
  }

  validateCity(value: string): ValidationResult {
    return validationService.validateField(value, VALIDATION_RULE_SETS.CITY, 'City');
  }

  validateState(value: string): ValidationResult {
    return validationService.validateField(value, VALIDATION_RULE_SETS.STATE, 'State');
  }

  validatePassword(value: string): ValidationResult {
    return validationService.validateField(value, VALIDATION_RULE_SETS.PASSWORD, 'Password');
  }

  validateConfirmPassword(password: string, confirmPassword: string): ValidationResult {
    if (!confirmPassword) {
      return { isValid: false, message: 'Password confirmation is required' };
    }

    if (password !== confirmPassword) {
      return { isValid: false, message: 'Passwords do not match' };
    }

    return { isValid: true };
  }

  validateField(fieldName: keyof RegistrationFormData, value: string, formData?: RegistrationFormData): ValidationResult {
    switch (fieldName) {
      case 'firstName':
        return this.validateFirstName(value);
      case 'lastName':
        return this.validateLastName(value);
      case 'email':
        return this.validateEmail(value);
      case 'phone':
        return this.validatePhone(value);
      case 'birthDate':
        return this.validateBirthDate(value);
      case 'gender':
        return this.validateGender(value);
      case 'city':
        return this.validateCity(value);
      case 'state':
        return this.validateState(value);
      case 'password':
        return this.validatePassword(value);
      case 'confirmPassword':
        return this.validateConfirmPassword(formData?.password || '', value);
      default:
        return { isValid: true };
    }
  }

  validateForm(formData: RegistrationFormData): RegistrationValidationErrors {
    const errors: RegistrationValidationErrors = {};

    const firstNameResult = this.validateFirstName(formData.firstName);
    if (!firstNameResult.isValid) {
      errors.firstName = firstNameResult.message;
    }

    const lastNameResult = this.validateLastName(formData.lastName);
    if (!lastNameResult.isValid) {
      errors.lastName = lastNameResult.message;
    }

    const emailResult = this.validateEmail(formData.email);
    if (!emailResult.isValid) {
      errors.email = emailResult.message;
    }

    const phoneResult = this.validatePhone(formData.phone);
    if (!phoneResult.isValid) {
      errors.phone = phoneResult.message;
    }

    const birthDateResult = this.validateBirthDate(formData.birthDate);
    if (!birthDateResult.isValid) {
      errors.birthDate = birthDateResult.message;
    }

    const genderResult = this.validateGender(formData.gender);
    if (!genderResult.isValid) {
      errors.gender = genderResult.message;
    }

    const cityResult = this.validateCity(formData.city);
    if (!cityResult.isValid) {
      errors.city = cityResult.message;
    }

    const stateResult = this.validateState(formData.state);
    if (!stateResult.isValid) {
      errors.state = stateResult.message;
    }

    const passwordResult = this.validatePassword(formData.password);
    if (!passwordResult.isValid) {
      errors.password = passwordResult.message;
    }

    const confirmPasswordResult = this.validateConfirmPassword(formData.password, formData.confirmPassword);
    if (!confirmPasswordResult.isValid) {
      errors.confirmPassword = confirmPasswordResult.message;
    }

    return errors;
  }

  isFormValid(formData: RegistrationFormData): boolean {
    const errors = this.validateForm(formData);
    return Object.keys(errors).length === 0;
  }

  getValidationRules() {
    return {
      firstName: VALIDATION_RULE_SETS.NAME,
      lastName: VALIDATION_RULE_SETS.NAME,
      email: VALIDATION_RULE_SETS.EMAIL,
      phone: VALIDATION_RULE_SETS.PHONE,
      birthDate: {
        required: true,
        custom: (value: string) => this.validateBirthDate(value)
      },
      gender: VALIDATION_RULE_SETS.OPTIONAL_TEXT,
      city: VALIDATION_RULE_SETS.CITY,
      state: VALIDATION_RULE_SETS.STATE,
      password: VALIDATION_RULE_SETS.PASSWORD,
      confirmPassword: {
        required: true,
        custom: (value: string, formData?: RegistrationFormData) => 
          this.validateConfirmPassword(formData?.password || '', value)
      }
    };
  }
}

export const registrationValidationService = new RegistrationValidationService();
export default registrationValidationService;