import React from 'react';
import styles from './Buttons.module.css';
import LinkButton from './LinkButton/LinkButton';

interface SearchButtonProps {
  onClick?: () => void;
}

interface FavoriteButtonProps {
  onClick?: () => void;
}

interface CTAButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
}

interface SubmitButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

interface LoginButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export const SearchButton: React.FC<SearchButtonProps> = ({
  onClick
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={styles.searchButton}
    >
      🔍 Pesquisar
    </button>
  );
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  onClick
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.favoriteButton}
    >
      ⭐ Adicionar aos Favoritos
    </button>
  );
};

export const CTAButton: React.FC<CTAButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false
}) => {
  const getButtonClass = () => {
    let baseClass;
    switch (variant) {
      case 'secondary':
        baseClass = styles.ctaButtonSecondary;
        break;
      case 'danger':
        baseClass = styles.ctaButtonDanger;
        break;
      default:
        baseClass = styles.ctaButton;
        break;
    }
    
    const sizeClass = size === 'small' ? styles.ctaButtonSmall : 
                     size === 'large' ? styles.ctaButtonLarge : '';
    
    return `${baseClass} ${sizeClass}`.trim();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${getButtonClass()} ${className}`}
    >
      {children}
    </button>
  );
};



export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  children,
  loading = false,
  disabled = false
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={loading || disabled}
      className={styles.submitButton}
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
  onClick,
  children = 'Entrar'
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.loginButton}
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
  Link: LinkButton,
};

export { LinkButton };
export default Buttons;