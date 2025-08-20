import React from 'react';
import styles from './Buttons.module.css';

interface BaseButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

interface SearchButtonProps extends BaseButtonProps {
  type?: 'submit' | 'button';
}

interface FavoriteButtonProps extends BaseButtonProps {
  type?: 'button';
}

interface CTAButtonProps extends BaseButtonProps {
  type?: 'button';
  children: React.ReactNode;
}



interface SubmitButtonProps extends BaseButtonProps {
  type?: 'submit' | 'button';
  children: React.ReactNode;
  loading?: boolean;
}

interface LoginButtonProps extends BaseButtonProps {
  type?: 'button';
  children?: React.ReactNode;
}

export const SearchButton: React.FC<SearchButtonProps> = ({
  disabled = false,
  onClick,
  className = '',
  type = 'submit',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.searchButton} ${className}`}
      {...props}
    >
      🔍 Pesquisar
    </button>
  );
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.favoriteButton} ${className}`}
      {...props}
    >
      ⭐ Adicionar aos Favoritos
    </button>
  );
};

export const CTAButton: React.FC<CTAButtonProps> = ({
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.ctaButton} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};



export const SubmitButton: React.FC<SubmitButtonProps> = ({
  disabled = false,
  onClick,
  className = '',
  type = 'submit',
  children,
  loading = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.submitButton} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className={styles.spinner}></span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export const LoginButton: React.FC<LoginButtonProps> = ({
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  children = 'Entrar',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.loginButton} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Buttons = {
  Search: SearchButton,
  Favorite: FavoriteButton,
  CTA: CTAButton,
  Submit: SubmitButton,
  Login: LoginButton,
};

export default Buttons;