import React from 'react';
import useFavorites, { type FavoriteVehicle } from '../../hooks/useFavorites';
import FavoriteCard from '../../components/Card/FavoriteCard';
import { Title } from '../../components/UI/Typography';
import { Text } from '../../components/UI/Typography';
import { CTAButton } from '../../components/UI/Buttons/Buttons';
import styles from './Favorites.module.css';

const Favorites: React.FC = () => {
  const { favorites, removeFromFavorites, clearAllFavorites } = useFavorites();

  const handleRemoveFavorite = (id: string) => {
    removeFromFavorites(id);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      clearAllFavorites();
    }
  };

  return (
    <div className={styles.favoritesContainer}>
      <div className={styles.header}>
        <Title className={styles.pageTitle}>My Favorites</Title>
        <Text className={styles.pageDescription}>
          Manage your favorite vehicles
        </Text>
      </div>

      {favorites.length > 0 ? (
        <>
          <div className={styles.actionsBar}>
            <Text className={styles.countText}>
              {favorites.length} vehicle{favorites.length !== 1 ? 's' : ''} saved
            </Text>
            <CTAButton
              variant="danger"
              size="small"
              onClick={handleClearAll}
              className={styles.clearAllButton}
            >
              Clear All
            </CTAButton>
          </div>
          
          <div className={styles.favoritesGrid}>
            {favorites.map((favorite: { id: string; [key: string]: any }) => (
              <FavoriteCard
                key={favorite.id}
                vehicle={favorite as FavoriteVehicle}
                onRemove={handleRemoveFavorite}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>💔</div>
          <Text className={styles.emptyTitle}>
            No favorites yet
          </Text>
          <Text className={styles.emptyDescription}>
            Start searching for vehicles and add them to your favorites list!
          </Text>
        </div>
      )}
    </div>
  );
};

export default Favorites;