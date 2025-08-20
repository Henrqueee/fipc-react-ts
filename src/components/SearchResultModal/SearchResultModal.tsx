import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import type { VehicleResult } from '../../store/useVehicleStore';
import { FavoriteButton } from '../UI/Buttons/Buttons';
import { Toast } from '../UI/Toast';
import styles from './SearchResultModal.module.css';

interface ISearchResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleData: VehicleResult | null;
  isLoading: boolean;
  error: string | null;
}

const SearchResultModal: React.FC<ISearchResultModalProps> = ({
  isOpen,
  onClose,
  vehicleData,
  isLoading,
}) => {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  if (!isOpen) return null;

  const handleAddToFavorites = () => {
    if (vehicleData) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const newFavorite = { 
        ...vehicleData,
        id: vehicleData.id || Date.now().toString()
      };
      
      const existingIndex = favorites.findIndex((fav: any) => fav.id === newFavorite.id);
      if (existingIndex === -1) {
        favorites.push(newFavorite);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
      }
    }
  };

  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      {showSuccessToast && (
        <Toast isVisible={showSuccessToast}
          message="Veículo adicionado aos favoritos!"
          type="success"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
      
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Resultado da Consulta</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>
        
        <div className={styles.content}>
          {isLoading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Consultando tabela FIPE...</p>
            </div>
          ) : vehicleData ? (
            <>
              <div className={styles.vehicleInfo}>
                <div className={styles.vehicleHeader}>
                  <h3>{vehicleData.brand} {vehicleData.model}</h3>
                  <span className={styles.year}>{vehicleData.year}</span>
                </div>
                
                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Tipo:</span>
                    <span className={styles.value}>{vehicleData.vehicleType}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Combustível:</span>
                    <span className={styles.value}>{vehicleData.fuel || 'Gasolina'}</span>
                  </div>
                </div>
              </div>

              <div className={styles.priceSection}>
                <div className={styles.priceLabel}>Valor FIPE</div>
                <div className={styles.price}>{vehicleData.price}</div>
                <div className={styles.priceDate}>Referência: {vehicleData.month}</div>
              </div>

              <div className={styles.actions}>
                <FavoriteButton
                  onClick={handleAddToFavorites}
                  disabled={false}
                />
              </div>
            </>
          ) : (
            <div className={styles.noData}>
              <p>Nenhum resultado encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default SearchResultModal;