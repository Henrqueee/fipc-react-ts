import React from 'react';
import styles from './Text.module.css';

interface ITextProps {
  children: React.ReactNode;
  variant?: 'body' | 'parallax' | 'small' | 'stat-label' | 'tech-feature';
  onDark?: boolean;
  onHeroStory?: boolean;
  className?: string;
  as?: 'p' | 'span' | 'label';
  htmlFor?: string;
}

const Text: React.FC<ITextProps> = ({ 
  children, 
  variant = 'body', 
  onDark = false,
  onHeroStory = false,
  className = '',
  as: Component = 'p',
  htmlFor
}) => {
  const getTextClass = () => {
    switch (variant) {
      case 'parallax':
        return styles.parallaxText;
      case 'small':
        return styles.smallText;
      case 'stat-label':
        return styles.statLabelText;
      case 'tech-feature':
        return styles.techFeatureText;
      default:
        return styles.bodyText;
    }
  };
  
  const darkClass = onDark && variant === 'body' ? styles.onDark : '';
  const heroStoryClass = onHeroStory && variant === 'body' ? styles.onHeroStory : '';
  
  const componentProps: any = {
    className: `${getTextClass()} ${darkClass} ${heroStoryClass} ${className}`
  };
  
  if (htmlFor && Component === 'label') {
    componentProps.htmlFor = htmlFor;
  }
  
  return (
    <Component {...componentProps}>
      {children}
    </Component>
  );
};

export default Text;