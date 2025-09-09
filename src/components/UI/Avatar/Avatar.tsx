import React from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  name: string;
  avatar?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  showUpload?: boolean;
  onUpload?: (file: File) => void;
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  avatar,
  size = 'medium',
  className = '',
  showUpload = false,
  onUpload
}) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const avatarClasses = [
    styles.avatar,
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.avatarContainer}>
      <div className={avatarClasses}>
        {avatar && avatar.trim() !== '' ? (
          <img 
            src={avatar} 
            alt={name} 
            className={styles.image}
            onError={(e) => {
              // If image fails to load, hide it and show initials
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const initialsSpan = target.nextElementSibling as HTMLElement;
              if (initialsSpan) {
                initialsSpan.style.display = 'flex';
              }
            }}
          />
        ) : null}
        <span 
          className={styles.initials}
          style={{ display: (avatar && avatar.trim() !== '') ? 'none' : 'flex' }}
        >
          {getInitials(name)}
        </span>
      </div>
      
      {showUpload && (
        <label className={styles.uploadButton}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          <span className={styles.uploadIcon}>📷</span>
        </label>
      )}
    </div>
  );
};

export default Avatar;