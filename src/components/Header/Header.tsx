import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { SubmitButton } from '../UI/Buttons/Buttons';
import { Title } from '../UI/Typography';
import LoginForm from '../LoginForm/LoginForm';
import UserMenu from '../UserMenu/UserMenu';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleCloseLogin = () => {
    setShowLoginForm(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <Link to="/" className={styles.logoLink}>
                <Title variant="section">FIPE Query</Title>
              </Link>
            </div>
            
            <nav className={styles.nav}>
              <Link to="/" className={styles.navLink}>Home</Link>
  
              <Link to="/about" className={styles.navLink}>About</Link>
              <Link to="/contact" className={styles.navLink}>Contact</Link>
              
              <div className={styles.authSection}>
                {isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <SubmitButton onClick={handleLoginClick}>
                    Entrar
                  </SubmitButton>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {showLoginForm && (
        <LoginForm 
          onClose={handleCloseLogin}
          onSuccess={() => setShowLoginForm(false)}
        />
      )}
    </>
  );
};

export default Header;