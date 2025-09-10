import React from 'react';
import { Text } from '../UI/Typography';
import styles from './Loading.module.css';

interface LoadingProps {
  text?: string;
  overlay?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  text = 'Loading...', 
  overlay = false 
}) => {
  const containerClass = overlay 
    ? `${styles.loading} ${styles.overlay}` 
    : styles.loading;

  return (
    <div className={containerClass}>
      <div className={styles.fipcContainer}>
        <div className={`${styles.fipcLetter} ${styles.letterF}`}>F</div>
        <div className={`${styles.fipcLetter} ${styles.letterI}`}>I</div>
        <div className={`${styles.fipcLetter} ${styles.letterP}`}>P</div>
        <div className={`${styles.fipcLetter} ${styles.letterC}`}>C</div>
      </div>
      {text && <Text className={styles.text}>{text}</Text>}
    </div>
  );
};

export default Loading;