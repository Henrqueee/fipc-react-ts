import React from 'react';
import styles from './LinkButton.module.css';

interface ILinkButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const LinkButton: React.FC<ILinkButtonProps> = ({
  children,
  onClick
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.linkButton}
    >
      {children}
    </button>
  );
};

export default LinkButton;