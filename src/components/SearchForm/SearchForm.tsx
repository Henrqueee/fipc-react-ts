import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useVehicleStore } from '../../store/useVehicleStore';
import type { VehicleResult } from '../../store/useVehicleStore';
import { SearchButton, FavoriteButton } from '../UI/Buttons/Buttons';
import { SelectInput } from '../UI/Inputs/Inputs';
import { Text, Heading } from '../UI/Typography';
import { Toast } from '../UI/Toast';
import SearchResultModal from '../SearchResultModal/SearchResultModal';
import useFavorites from '../../hooks/useFavorites';
import styles from './SearchForm.module.css';

const SearchForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<VehicleResult | null>(null);
  const [toastState, setToastState] = useState({ isVisible: false, message: '', type: 'info' as 'success' | 'error' | 'info' });
  const location = useLocation();
  const { addToFavorites } = useFavorites();

  const { searchVehicle, updateCurrentSearch, isLoading, error } = useVehicleStore();
  
  const [formData, setFormData] = useState({
    vehicleType: '',
    brand: '',
    model: '',
    year: '',
    fuel: ''
  });

  // Pre-fill vehicle type from navigation state
  useEffect(() => {
    if (location.state && location.state.vehicleType) {
      setFormData(prev => ({
        ...prev,
        vehicleType: location.state.vehicleType
      }));
    }
  }, [location.state]);

  // Static data for simplification
  const brands = ['Volkswagen', 'Chevrolet', 'Fiat', 'Ford', 'Honda', 'Toyota'];
  const models = ['Gol', 'Polo', 'T-Cross', 'Virtus', 'Jetta', 'Tiguan'];
  const years = ['2024', '2023', '2022', '2021', '2020', '2019'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { vehicleType, brand, model, year, fuel } = formData;
    if (vehicleType && brand && model && year) {
      updateCurrentSearch({ vehicleType, brand, model, year, fuel });
      setIsModalOpen(true);
      const result = await searchVehicle();
      setSearchResult(result);
    }
  };

  const handleAddToFavorites = () => {
    const { vehicleType, brand, model, year, fuel } = formData;
    if (vehicleType && brand && model && year) {
      const result = addToFavorites({ 
        vehicleType, 
        brand, 
        model, 
        year, 
        fuel,
        price: searchResult?.price || '',
        month: searchResult?.month || ''
      });
      
      setToastState({
        isVisible: true,
        message: result.message,
        type: result.success ? 'success' : 'error'
      });
      
      setTimeout(() => {
        setToastState(prev => ({ ...prev, isVisible: false }));
      }, 3000);
    } else {
      setToastState({
        isVisible: true,
        message: 'Por favor, preencha todos os campos obrigatórios!',
        type: 'error'
      });
      
      setTimeout(() => {
        setToastState(prev => ({ ...prev, isVisible: false }));
      }, 3000);
    }
  };



  return (
    <div className={styles.searchForm}>
      {toastState.isVisible && createPortal(
        <Toast
          isVisible={toastState.isVisible}
          message={toastState.message}
          type={toastState.type}
          onClose={() => setToastState(prev => ({ ...prev, isVisible: false }))}
        />,
        document.body
      )}
      <div className="container">
        <div className={styles.formCard}>
          <Heading variant="large" level={2}>Check your vehicle's value</Heading>
          <Text className={styles.formDescription}>
            Select your vehicle information to check the value in the FIPE table
          </Text>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <SelectInput
                id="vehicleType"
                label="Vehicle Type"
                value={formData.vehicleType}
                onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                placeholder="Select type"
                options={[
                  { value: "cars", label: "Cars" },
                  { value: "motorcycles", label: "Motorcycles" },
                  { value: "trucks", label: "Trucks" }
                ]}
              />

              <SelectInput
                id="brand"
                label="Brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Select brand"
                options={brands.map(brand => ({ value: brand, label: brand }))}
              />
            </div>

            <div className={styles.formRow}>
              <SelectInput
                id="model"
                label="Model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="Select model"
                options={models.map(model => ({ value: model, label: model }))}
              />

              <SelectInput
                id="year"
                label="Year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="Select year"
                options={years.map(year => ({ value: year, label: year }))}
              />
            </div>

            <div className={styles.formActions}>
              <SearchButton />
              <FavoriteButton
                onClick={handleAddToFavorites}
              />
            </div>
          </form>
        </div>

        <SearchResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          vehicleData={searchResult}
          isLoading={isLoading}
          error={error}
        />

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📊</div>
            <Heading variant="small" level={3}>Updated Data</Heading>
            <Text>Information always updated according to the official FIPE table</Text>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🆓</div>
            <Heading variant="small" level={3}>Free Query</Heading>
            <Text>Perform as many queries as you want, completely free</Text>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <Heading variant="small" level={3}>Fast Results</Heading>
            <Text>Get your query results in seconds</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;