import React from 'react';
import styles from './Loading.module.css';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  overlay?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  text = 'Carregando...', 
  overlay = false 
}) => {
  const containerClass = overlay 
    ? `${styles.loading} ${styles.overlay}` 
    : styles.loading;

  return (
    <div className={containerClass}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Loading;