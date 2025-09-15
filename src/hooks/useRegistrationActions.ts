import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToast from './useToast';
import { registrationDataService } from '../services/registrationDataService';
import type {
  RegistrationUserData,
  RegistrationActionsState,
  RegistrationActions
} from '../types/registrationTypes';

export const useRegistrationActions = (): RegistrationActionsState & RegistrationActions => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [state, setState] = useState<RegistrationActionsState>({
    isSubmitting: false,
    error: null,
    success: false
  });

  const submitRegistration = async (userData: RegistrationUserData): Promise<void> => {
    setState(prev => ({
      ...prev,
      isSubmitting: true,
      error: null,
      success: false
    }));

    try {
      const result = await registrationDataService.registerUser(userData);

      if (result.success) {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          success: true,
          error: null
        }));

        showToast('Registration completed successfully!', 'success');

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setState(prev => ({
          ...prev,
          isSubmitting: false,
          error: result.message,
          success: false
        }));

        showToast(result.message, 'error');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        error: errorMessage,
        success: false
      }));

      showToast(errorMessage, 'error');
    }
  };

  const resetState = (): void => {
    setState({
      isSubmitting: false,
      error: null,
      success: false
    });
  };

  return {
    ...state,
    submitRegistration,
    resetState
  };
};