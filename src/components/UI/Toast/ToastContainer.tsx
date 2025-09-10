import React from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import type { ToastState } from '../../../hooks/useToast';
import styles from './ToastContainer.module.css';

export interface ToastContainerProps {
  toasts: ToastState[];
  onClose: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  const toastElements = (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  );

  return createPortal(toastElements, document.body);
};

export default ToastContainer;