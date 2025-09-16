import { validationService, VALIDATION_RULE_SETS } from './validationService';
import type { ContactFormData, ContactValidationErrors } from '../types/contactTypes';

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

class ContactValidationService {
  validateName(name: string): ValidationResult {
    return validationService.validateField(name, VALIDATION_RULE_SETS.NAME, 'Name');
  }

  validateEmail(email: string): ValidationResult {
    return validationService.validateField(email, VALIDATION_RULE_SETS.EMAIL, 'Email');
  }

  validateSubject(subject: string): ValidationResult {
    if (!subject.trim()) {
      return {
        isValid: false,
        message: 'Subject is required'
      };
    }

    const validSubjects = ['query-question', 'technical-issue', 'suggestion', 'partnership', 'other'];
    const isValidSubject = validSubjects.includes(subject);

    return {
      isValid: isValidSubject,
      message: isValidSubject ? undefined : 'Please select a valid subject'
    };
  }

  validateMessage(message: string): ValidationResult {
    if (!message.trim()) {
      return {
        isValid: false,
        message: 'Message is required'
      };
    }

    if (message.trim().length < 10) {
      return {
        isValid: false,
        message: 'Message must be at least 10 characters long'
      };
    }

    if (message.trim().length > 1000) {
      return {
        isValid: false,
        message: 'Message must not exceed 1000 characters'
      };
    }

    return {
      isValid: true
    };
  }

  validateField(fieldName: keyof ContactFormData, value: string): string | null {
    let result: ValidationResult;

    switch (fieldName) {
      case 'name':
        result = this.validateName(value);
        break;
      case 'email':
        result = this.validateEmail(value);
        break;
      case 'subject':
        result = this.validateSubject(value);
        break;
      case 'message':
        result = this.validateMessage(value);
        break;
      default:
        return null;
    }

    return result.isValid ? null : (result.message || 'Invalid field');
  }

  validateContactForm(formData: ContactFormData): ContactValidationErrors {
    const errors: ContactValidationErrors = {};

    const nameResult = this.validateName(formData.name);
    if (!nameResult.isValid) {
      errors.name = nameResult.message;
    }

    const emailResult = this.validateEmail(formData.email);
    if (!emailResult.isValid) {
      errors.email = emailResult.message;
    }

    const subjectResult = this.validateSubject(formData.subject);
    if (!subjectResult.isValid) {
      errors.subject = subjectResult.message;
    }

    const messageResult = this.validateMessage(formData.message);
    if (!messageResult.isValid) {
      errors.message = messageResult.message;
    }

    return errors;
  }

  isFormValid(formData: ContactFormData): boolean {
    const errors = this.validateContactForm(formData);
    return Object.keys(errors).length === 0;
  }
}

export const contactValidationService = new ContactValidationService();
export default contactValidationService;