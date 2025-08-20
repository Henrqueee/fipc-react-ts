import React from 'react';
import styles from './Text.module.css';

interface ITextProps {
  children: React.ReactNode;
  variant?: 'body' | 'parallax' | 'small';
  onDark?: boolean;
  onHeroStory?: boolean;
  className?: string;
  as?: 'p' | 'span' | 'div';
}

const Text: React.FC<ITextProps> = ({ 
  children, 
  variant = 'body', 
  onDark = false,
  onHeroStory = false,
  className = '',
  as: Component = 'p'
}) => {
  const getTextClass = () => {
    switch (variant) {
      case 'parallax':
        return styles.parallaxText;
      case 'small':
        return styles.smallText;
      default:
        return styles.bodyText;
    }
  };
  
  const darkClass = onDark && variant === 'body' ? styles.onDark : '';
  const heroStoryClass = onHeroStory && variant === 'body' ? styles.onHeroStory : '';
  
  return (
    <Component className={`${getTextClass()} ${darkClass} ${heroStoryClass} ${className}`}>
      {children}
    </Component>
  );
};

export default Text;