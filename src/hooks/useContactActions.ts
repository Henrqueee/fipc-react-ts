import { useState, useCallback } from 'react';
import { contactDataService } from '../services/contactDataService';
import useToast from './useToast';
import type { ContactFormData } from '../types/contactTypes';

interface UseContactActionsReturn {
  isSubmitting: boolean;
  submitContact: (contactData: ContactFormData) => Promise<boolean>;
  toasts: any[];
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  hideToast: (id: string) => void;
}

export const useContactActions = (): UseContactActionsReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, showToast, hideToast } = useToast();

  const submitContact = useCallback(async (contactData: ContactFormData): Promise<boolean> => {
    if (isSubmitting) {
      return false;
    }

    setIsSubmitting(true);

    try {
      // Validate submission data
      if (!contactDataService.validateSubmissionData(contactData)) {
        showToast('Please fill in all required fields correctly.', 'error');
        return false;
      }

      // Submit contact message
      const result = await contactDataService.submitContactMessage(contactData);

      if (result.success) {
        showToast(result.message, 'success');
        return true;
      } else {
        showToast(result.message, 'error');
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to send message. Please try again.';
      
      showToast(errorMessage, 'error');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, showToast]);

  return {
    isSubmitting,
    submitContact,
    toasts,
    showToast,
    hideToast
  };
};