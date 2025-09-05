import React, { useState } from 'react';
import { Heading, Text } from '../../components/UI/Typography';
import { CTAButton } from '../../components/UI/Buttons/Buttons';
import useFavorites from '../../hooks/useFavorites';
import styles from './Favorites.module.css';

const Favorites: React.FC = () => {
  const { favorites, removeFromFavorites, clearAllFavorites } = useFavorites();
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleRemoveFavorite = (id: string) => {
    const result = removeFromFavorites(id);
    setToastMessage({
      message: result.message,
      type: result.success ? 'success' : 'error'
    });
    
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleClearAll = () => {
    const result = clearAllFavorites();
    setToastMessage({
      message: result.message,
      type: result.success ? 'success' : 'error'
    });
    
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className={styles.favoritesContainer}>
      <div className="container">
        <div className={styles.header}>
          <Heading variant="large" level={1}>My Favorites</Heading>
          <Text>Manage your favorite vehicles</Text>
        </div>

        {toastMessage && (
          <div className={`${styles.toast} ${styles[toastMessage.type]}`}>
            {toastMessage.message}
          </div>
        )}

        {favorites.length > 0 ? (
          <>
            <div className={styles.actions}>
              <CTAButton onClick={handleClearAll}>Clear All</CTAButton>
            </div>
            <div className={styles.favoritesList}>
              {favorites.map((favorite) => (
                <div key={favorite.id} className={styles.favoriteCard}>
                  <div className={styles.favoriteInfo}>
                    <Heading variant="medium" level={3}>
                      {favorite.brand} {favorite.model}
                    </Heading>
                    <Text as="span" className={styles.year}>{favorite.year}</Text>
                    
                    <div className={styles.details}>
                      <div className={styles.detailItem}>
                        <Text as="span" className={styles.label}>Type:</Text>
                        <Text as="span" className={styles.value}>{favorite.vehicleType}</Text>
                      </div>
                      <div className={styles.detailItem}>
                        <Text as="span" className={styles.label}>Fuel:</Text>
                        <Text as="span" className={styles.value}>{favorite.fuel || 'Gasoline'}</Text>
                      </div>
                    </div>
                    
                    <div className={styles.priceSection}>
                      <Text className={styles.priceLabel}>FIPE Value</Text>
                      <Text className={styles.price}>{favorite.price}</Text>
                      <Text className={styles.priceDate}>Reference: {favorite.month}</Text>
                    </div>
                  </div>
                  
                  <button 
                    className={styles.removeButton}
                    onClick={() => handleRemoveFavorite(favorite.id || '')}
                    aria-label="Remove from favorites"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <Text>You haven't added any vehicles to favorites yet.</Text>
            <Text>Make a search and add vehicles to your favorites list!</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;