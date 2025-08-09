import React from 'react';
import styles from './Toast.module.css';

export interface IToastProps {
  message: string;
  type?: 'error' | 'success' | 'warning' | 'info';
  isVisible: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const Toast: React.FC<IToastProps> = ({
  message,
  type = 'info',
  isVisible,
  onClose,
  autoClose = false,
  duration = 3000
}) => {
  React.useEffect(() => {
    if (autoClose && isVisible && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, isVisible, onClose, duration]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'error':
        return '✕';
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.content}>
        <span className={styles.icon}>{getIcon()}</span>
        <span className={styles.message}>{message}</span>
      </div>
      {onClose && (
        <button
          className={styles.closeButton}
          onClick={onClose}
          type="button"
          aria-label="Fechar"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Toast;