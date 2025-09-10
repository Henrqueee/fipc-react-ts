import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useForm } from '../../hooks/useForm';
import { ToastContainer } from '../UI/Toast';
import useToast from '../../hooks/useToast';
import { SubmitButton } from '../UI/Buttons/Buttons';
import { Title, Text } from '../UI/Typography';
import styles from './LoginForm.module.css';

interface ILoginFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();
  const { toasts, showToast, hideToast } = useToast();
  
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validationRules: {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      password: {
        required: true,
        minLength: 6
      }
    },
    onSubmit: async (values) => {
      await login(values);
      showToast('Login successful!', 'success');
      
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1500);
    },
    enableToast: false
  });



  const handleClose = () => {
    clearError();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <ToastContainer toasts={toasts} onClose={hideToast} />
        
        {error && (
          <div className={styles.errorMessage}>
            <Text>{error}</Text>
          </div>
        )}
        
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

        <form onSubmit={form.handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <Text as="label" htmlFor="email">Email</Text>
            <input
              id="email"
              type="email"
              value={form.values.email}
              onChange={(e) => form.handleChange('email', e.target.value)}
              onBlur={() => form.handleBlur('email')}
              placeholder="your@email.com"
              required
              disabled={isLoading || form.isSubmitting}
            />
            {form.errors.email && form.touched.email && (
              <Text className={styles.errorText}>{form.errors.email}</Text>
            )}
          </div>

          <div className={styles.inputGroup}>
            <Text as="label" htmlFor="password">Password</Text>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={form.values.password}
                onChange={(e) => form.handleChange('password', e.target.value)}
                onBlur={() => form.handleBlur('password')}
                placeholder="Your password"
                required
                disabled={isLoading || form.isSubmitting}
              />
              {form.errors.password && form.touched.password && (
                <Text className={styles.errorText}>{form.errors.password}</Text>
              )}
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading || form.isSubmitting}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <SubmitButton
            loading={isLoading || form.isSubmitting}
            disabled={!form.isValid}
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