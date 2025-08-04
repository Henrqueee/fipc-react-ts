import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>
              <h1>FIPE Query</h1>
            </Link>
          </div>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/query" className={styles.navLink}>Query</Link>
            <Link to="/about" className={styles.navLink}>About</Link>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;