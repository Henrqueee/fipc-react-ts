import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFavorites from '../../hooks/useFavorites';
import { Toast } from '../../components/UI/Toast';
import { Title, Text, Heading } from '../../components/UI/Typography';
import { CTAButton } from '../../components/UI/Buttons/Buttons';
import styles from './Favorites.module.css';

const Favorites: React.FC = () => {
  const { favorites, removeFromFavorites, clearFavorites, getFavoritesCount } = useFavorites();
  const [toastState, setToastState] = useState({ isVisible: false, message: '', type: 'info' as 'success' | 'error' | 'info' });

  const handleRemoveFavorite = (vehicleId: string) => {
    const result = removeFromFavorites(vehicleId);
    
    setToastState({
      isVisible: true,
      message: result.message,
      type: result.success ? 'success' : 'error'
    });
    
    setTimeout(() => {
      setToastState(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleClearAllFavorites = () => {
    if (favorites.length === 0) {
      setToastState({
        isVisible: true,
        message: 'Não há favoritos para remover!',
        type: 'error'
      });
    } else {
      clearFavorites();
      setToastState({
        isVisible: true,
        message: 'Todos os favoritos foram removidos!',
        type: 'success'
      });
    }
    
    setTimeout(() => {
      setToastState(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const formatPrice = (price?: string) => {
    if (!price) return 'Preço não disponível';
    return price;
  };

  return (
    <div className={styles.favoritesPage}>
      {toastState.isVisible && (
        <Toast
          isVisible={toastState.isVisible}
          message={toastState.message}
          type={toastState.type}
          onClose={() => setToastState(prev => ({ ...prev, isVisible: false }))}
        />
      )}
      
      <div className="container">
        <div className={styles.header}>
          <Title variant="section">Meus Favoritos</Title>
          <Text className={styles.subtitle}>
            {getFavoritesCount() === 0 
              ? 'Você ainda não possui veículos favoritos'
              : `${getFavoritesCount()} veículo${getFavoritesCount() > 1 ? 's' : ''} salvo${getFavoritesCount() > 1 ? 's' : ''}`
            }
          </Text>
        </div>

        {favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>⭐</div>
            <Heading variant="medium" level={3}>Nenhum favorito encontrado</Heading>
            <Text className={styles.emptyText}>
              Adicione veículos aos seus favoritos para vê-los aqui.
            </Text>
            <Link to="/" className={styles.backToSearchLink}>
              <CTAButton>
                Buscar Veículos
              </CTAButton>
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.actions}>
              <button 
                className={styles.clearAllButton}
                onClick={handleClearAllFavorites}
                type="button"
              >
                🗑️ Limpar Todos
              </button>
            </div>
            
            <div className={styles.favoritesGrid}>
              {favorites.map((vehicle) => (
                <div key={vehicle.id} className={styles.favoriteCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.vehicleInfo}>
                      <Heading variant="small" level={4}>
                        {vehicle.brand} {vehicle.model}
                      </Heading>
                      <Text className={styles.year}>{vehicle.year}</Text>
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveFavorite(vehicle.id)}
                      type="button"
                      aria-label="Remover dos favoritos"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className={styles.cardBody}>
                    <div className={styles.details}>
                      <div className={styles.detailItem}>
                        <Text className={styles.label}>Tipo:</Text>
                        <Text className={styles.value}>{vehicle.vehicleType}</Text>
                      </div>
                      
                      {vehicle.fuel && (
                        <div className={styles.detailItem}>
                          <Text className={styles.label}>Combustível:</Text>
                          <Text className={styles.value}>{vehicle.fuel}</Text>
                        </div>
                      )}
                      
                      {vehicle.price && (
                        <div className={styles.priceSection}>
                          <Text className={styles.priceLabel}>Valor FIPE</Text>
                          <Text className={styles.price}>{formatPrice(vehicle.price)}</Text>
                          {vehicle.month && (
                            <Text className={styles.priceDate}>Ref: {vehicle.month}</Text>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;