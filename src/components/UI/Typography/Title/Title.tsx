import React from 'react';
import styles from './Title.module.css';

interface ITitleProps {
  children: React.ReactNode;
  variant?: 'hero' | 'section';
  onDark?: boolean;
  className?: string;
}

const Title: React.FC<ITitleProps> = ({ 
  children, 
  variant = 'section', 
  onDark = false,
  className = '' 
}) => {
  const titleClass = variant === 'hero' ? styles.heroTitle : styles.sectionTitle;
  const darkClass = onDark && variant === 'section' ? styles.onDark : '';
  
  return (
    <h1 className={`${titleClass} ${darkClass} ${className}`}>
      {children}
    </h1>
  );
};

export default Title;