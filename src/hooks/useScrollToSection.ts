import { useCallback } from 'react';

export const useScrollToSection = () => {
  const scrollToSection = useCallback((className: string) => {
    const section = document.querySelector(`.${className}`);
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return { scrollToSection };
};

export default useScrollToSection;