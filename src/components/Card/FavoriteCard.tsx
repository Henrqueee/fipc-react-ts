import React from 'react';
import { Text, Heading } from '../UI/Typography';
import { CTAButton } from '../UI/Buttons/Buttons';
import type { FavoriteVehicle } from '../../hooks/useFavorites';
import styles from './FavoriteCard.module.css';

interface FavoriteCardProps {
  vehicle: FavoriteVehicle;
  onRemove: (id: string) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({ vehicle, onRemove }) => {
  const handleRemove = () => {
    onRemove(vehicle.id);
  };

  return (
    <div className={styles.favoriteCard}>
      <div className={styles.cardHeader}>
        <Heading variant="medium" level={3} className={styles.vehicleTitle}>
          {vehicle.brand} {vehicle.model}
        </Heading>
        <CTAButton
          variant="danger"
          size="small"
          onClick={handleRemove}
          className={styles.removeButton}
        >
          ✕
        </CTAButton>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <Text className={styles.infoLabel}>Year</Text>
            <Text className={styles.infoValue}>{vehicle.year}</Text>
          </div>
          
          <div className={styles.infoItem}>
            <Text className={styles.infoLabel}>Type</Text>
            <Text className={styles.infoValue}>{vehicle.vehicleType}</Text>
          </div>
          
          <div className={styles.infoItem}>
            <Text className={styles.infoLabel}>Fuel</Text>
            <Text className={styles.infoValue}>{vehicle.fuel}</Text>
          </div>
          
          <div className={styles.infoItem}>
            <Text className={styles.infoLabel}>Price</Text>
            <Text className={styles.priceValue}>{vehicle.price}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;