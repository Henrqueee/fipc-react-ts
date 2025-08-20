import React from 'react';
import styles from './Subtitle.module.css';

interface ISubtitleProps {
  children: React.ReactNode;
  variant?: 'hero' | 'section';
  className?: string;
}

const Subtitle: React.FC<ISubtitleProps> = ({ 
  children, 
  variant = 'section', 
  className = '' 
}) => {
  const subtitleClass = variant === 'hero' ? styles.heroSubtitle : styles.sectionSubtitle;
  
  return (
    <p className={`${subtitleClass} ${className}`}>
      {children}
    </p>
  );
};

export default Subtitle;