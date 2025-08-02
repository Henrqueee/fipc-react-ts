import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  type?: 'error' | 'warning' | 'info';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry, 
  onDismiss,
  type = 'error'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '❌';
    }
  };

  return (
    <div className={`${styles.errorMessage} ${styles[type]}`}>
      <div className={styles.content}>
        <span className={styles.icon}>{getIcon()}</span>
        <span className={styles.text}>{message}</span>
      </div>
      
      <div className={styles.actions}>
        {onRetry && (
          <button 
            onClick={onRetry}
            className={styles.retryButton}
            type="button"
          >
            🔄 Tentar Novamente
          </button>
        )}
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className={styles.dismissButton}
            type="button"
            aria-label="Fechar"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;