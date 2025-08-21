import React from 'react';
import styles from './Heading.module.css';

interface IHeadingProps {
  children: React.ReactNode;
  variant?: 'large' | 'medium' | 'small';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  onDark?: boolean;
  className?: string;
}

const Heading: React.FC<IHeadingProps> = ({ 
  children, 
  variant = 'medium', 
  level = 2,
  onDark = false,
  className = '' 
}) => {
  const headingClass = `${styles.heading} ${styles[variant]}`;
  const darkClass = onDark ? styles.onDark : '';
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={`${headingClass} ${darkClass} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;