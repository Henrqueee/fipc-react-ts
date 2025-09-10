import React from 'react';
import { createPortal } from 'react-dom';
import type { VehicleResult } from '../../store/useVehicleStore';
import { FavoriteButton } from '../UI/Buttons/Buttons';
import { Text, Heading } from '../UI/Typography';
import { ToastContainer } from '../UI/Toast';
import Loading from '../Loading/Loading';
import  useFavorites  from '../../hooks/usefavorites';
import useToast from '../../hooks/useToast';
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
  const { addToFavorites } = useFavorites();
  const { toasts, showToast, hideToast } = useToast();
  
  if (!isOpen) return null;

  const handleAddToFavorites = () => {
    if (vehicleData) {
      const result = addToFavorites({
        vehicleType: vehicleData.vehicleType,
        brand: vehicleData.brand,
        model: vehicleData.model,
        year: vehicleData.year,
        fuel: vehicleData.fuel,
        price: vehicleData.price,
        month: vehicleData.month
      });
      
      showToast(result.message, result.success ? 'success' : 'error');
    }
  };

  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      <ToastContainer toasts={toasts} onClose={hideToast} />
      
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <Heading variant="large" level={2}>Resultado da Consulta</Heading>
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
            <Loading text="Consultando tabela FIPE..." />
          ) : vehicleData ? (
            <>
              <div className={styles.vehicleInfo}>
                <div className={styles.vehicleHeader}>
                  <Heading variant="medium" level={3}>{vehicleData.brand} {vehicleData.model}</Heading>
                  <Text as="span" className={styles.year}>{vehicleData.year}</Text>
                </div>
                
                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <Text as="span" className={styles.label}>Tipo:</Text>
                    <Text as="span" className={styles.value}>{vehicleData.vehicleType}</Text>
                  </div>
                  <div className={styles.detailItem}>
                    <Text as="span" className={styles.label}>Combustível:</Text>
                    <Text as="span" className={styles.value}>{vehicleData.fuel || 'Gasolina'}</Text>
                  </div>
                </div>
              </div>

              <div className={styles.priceSection}>
                <Text className={styles.priceLabel}>Valor FIPE</Text>
                <Text className={styles.price}>{vehicleData.price}</Text>
                <Text className={styles.priceDate}>Referência: {vehicleData.month}</Text>
              </div>

              <div className={styles.actions}>
                <FavoriteButton
                  onClick={handleAddToFavorites}
                />
              </div>
            </>
          ) : (
            <div className={styles.noData}>
              <Text>Nenhum resultado encontrado</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default SearchResultModal;