import { useState, useCallback } from 'react';

export interface ToastState {
  message: string;
  type: 'error' | 'success' | 'warning' | 'info';
  isVisible: boolean;
  id: string;
}

export interface UseToastReturn {
  toasts: ToastState[];
  showToast: (message: string, type?: ToastState['type'], duration?: number) => void;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}

const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback((message: string, type: ToastState['type'] = 'info', duration: number = 3000) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    
    const newToast: ToastState = {
      message,
      type,
      isVisible: true,
      id
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-hide toast after duration
    setTimeout(() => {
      hideToast(id);
    }, duration);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showToast,
    hideToast,
    clearAllToasts
  };
};

export default useToast;