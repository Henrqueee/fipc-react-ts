import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>FIPE Query</h3>
            <p>
              Your reliable source for FIPE table queries. 
              Values updated monthly for cars, motorcycles, and trucks.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">📘</a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">📷</a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">🐦</a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">💼</a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4>Navigation</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/query">Query</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Services</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#">Car Query</a></li>
              <li><a href="#">Motorcycle Query</a></li>
              <li><a href="#">Truck Query</a></li>
              <li><a href="#">Price History</a></li>
              <li><a href="#">FIPE API</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Support</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>&copy; {currentYear} FIPE Query. All rights reserved.</p>
          </div>
          <div className={styles.disclaimer}>
            <p>
              The values presented are based on the official FIPE table and are for informational purposes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;