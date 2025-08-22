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
}

interface SubmitButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  loading?: boolean;
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
  children
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.ctaButton}
    >
      {children}
    </button>
  );
};



export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  children,
  loading = false
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={loading}
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