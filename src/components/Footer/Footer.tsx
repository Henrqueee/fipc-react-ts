import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LinkButton } from '../UI/Buttons/Buttons';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleServiceClick = (vehicleType: string) => {
    navigate('/', { state: { vehicleType } });
    setTimeout(() => {
      const searchSection = document.querySelector('[class*="searchSection"]');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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

          </div>

          <div className={styles.footerSection}>
            <h4>Navigation</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/">Home</Link></li>

              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/register">Register</Link></li>

            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Services</h4>
            <ul className={styles.footerLinks}>
              <li><LinkButton onClick={() => handleServiceClick('cars')}>Car Query</LinkButton></li>
              <li><LinkButton onClick={() => handleServiceClick('motorcycles')}>Motorcycle Query</LinkButton></li>
              <li><LinkButton onClick={() => handleServiceClick('trucks')}>Truck Query</LinkButton></li>
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