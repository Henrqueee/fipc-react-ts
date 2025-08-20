import React, { useState } from 'react';

import { useVehicleStore } from '../../store/useVehicleStore';
import type { VehicleResult } from '../../store/useVehicleStore';
import { SearchButton, FavoriteButton } from '../UI/Buttons/Buttons';
import { SelectInput } from '../UI/Inputs/Inputs';
import SearchResultModal from '../SearchResultModal/SearchResultModal';
import styles from './SearchForm.module.css';

const SearchForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<VehicleResult | null>(null);

  const { searchVehicle, updateCurrentSearch, isLoading, error } = useVehicleStore();
  
  const [formData, setFormData] = useState({
    vehicleType: '',
    brand: '',
    model: '',
    year: '',
    fuel: ''
  });

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
      // TODO: Implementar funcionalidade de favoritos
      // Exemplo: salvar no localStorage ou enviar para uma API
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const newFavorite = { vehicleType, brand, model, year, fuel, id: Date.now() };
      favorites.push(newFavorite);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Veículo adicionado aos favoritos!');
    }
  };

  const isFormValid = formData.vehicleType && formData.brand && 
                     formData.model && formData.year;

  return (
    <div className={styles.searchForm}>
      <div className="container">
        <div className={styles.formCard}>
          <h2>Check your vehicle's value</h2>
          <p className={styles.formDescription}>
            Select your vehicle information to check the value in the FIPE table
          </p>
          
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
                disabled={!formData.vehicleType}
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
                disabled={!formData.brand}
                options={models.map(model => ({ value: model, label: model }))}
              />

              <SelectInput
                id="year"
                label="Year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="Select year"
                disabled={!formData.model}
                options={years.map(year => ({ value: year, label: year }))}
              />
            </div>

            <div className={styles.formActions}>
              <SearchButton
                type="submit"
                disabled={!isFormValid}
              />
              <FavoriteButton
                onClick={handleAddToFavorites}
                disabled={!isFormValid}
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
            <h3>Updated Data</h3>
            <p>Information always updated according to the official FIPE table</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🆓</div>
            <h3>Free Query</h3>
            <p>Perform as many queries as you want, completely free</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Fast Results</h3>
            <p>Get your query results in seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;