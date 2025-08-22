import React, { useState } from 'react';
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
          message="Login realizado com sucesso!"
          type="success"
          isVisible={showSuccessToast}
        />
        
        <div className={styles.header}>
          <Title variant="section">Entrar</Title>
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
            <Text as="label" htmlFor="email">E-mail</Text>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <Text as="label" htmlFor="password">Senha</Text>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
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
            Entrar
          </SubmitButton>
        </form>

        <div className={styles.footer}>
          <Text>Dados de teste: demo@fipe.com / 123456</Text>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;