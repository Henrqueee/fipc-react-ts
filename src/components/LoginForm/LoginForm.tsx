import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { SubmitButton } from '../UI/Buttons/Buttons';
import { Title, Text } from '../UI/Typography';
import { Toast } from '../UI/Toast';
import styles from './LoginForm.module.css';

interface ILoginFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    try {
      await login({ email, password });
      setShowSuccessToast(true);
      
      // Aguarda um pouco para mostrar o toast de sucesso antes de fechar
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1500);
    } catch {
      // Erro já tratado no contexto
    }
  };

  const handleClose = () => {
    clearError();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Toast
          message={error || ''}
          type="error"
          isVisible={!!error}
          onClose={clearError}
        />
        
        <Toast
          message="Login successful!"
          type="success"
          isVisible={showSuccessToast}
        />
        
        <div className={styles.header}>
          <Title variant="section">Login</Title>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            type="button"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <Text as="label" htmlFor="email">Email</Text>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <Text as="label" htmlFor="password">Password</Text>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? '●' : '○'}
              </button>
            </div>
          </div>

          <SubmitButton
            loading={isLoading}
          >
            Login
          </SubmitButton>
        </form>

        <div className={styles.footer}>
          <div className={styles.registerSection}>
            <Text>Don't have an account? </Text>
            <Link to="/register" className={styles.registerLink} onClick={onClose}>
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;