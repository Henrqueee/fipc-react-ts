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
  
  const props = { className: `${headingClass} ${darkClass} ${className}` };
  
  switch (level) {
    case 1:
      return <h1 {...props}>{children}</h1>;
    case 2:
      return <h2 {...props}>{children}</h2>;
    case 3:
      return <h3 {...props}>{children}</h3>;
    case 4:
      return <h4 {...props}>{children}</h4>;
    case 5:
      return <h5 {...props}>{children}</h5>;
    case 6:
      return <h6 {...props}>{children}</h6>;
    default:
      return <h2 {...props}>{children}</h2>;
  }
};

export default Heading;