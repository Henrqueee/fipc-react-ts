import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { SubmitButton } from '../UI/Buttons/Buttons';
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
          <h2>Entrar</h2>
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
            <label htmlFor="email">E-mail</label>
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
            <label htmlFor="password">Senha</label>
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
            type="submit"
            disabled={isLoading || !email || !password}
            loading={isLoading}
          >
            Entrar
          </SubmitButton>
        </form>

        <div className={styles.footer}>
          <p>Dados de teste: demo@fipe.com / 123456</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;