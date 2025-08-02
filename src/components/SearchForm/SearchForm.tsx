import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicleStore } from '../../store/useVehicleStore';
import styles from './SearchForm.module.css';

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const { searchVehicle } = useVehicleStore();
  
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
    
    const { vehicleType, brand, model, year } = formData;
    if (vehicleType && brand && model && year) {
      await searchVehicle(`${brand}-${model}-${year}`);
      navigate('/query');
    }
  };

  const handleQuickSearch = () => {
    setFormData({
      vehicleType: 'Cars',
      brand: 'Volkswagen',
      model: 'Gol',
      year: '2023',
      fuel: 'Flex'
    });
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
              <div className={styles.formGroup}>
                <label htmlFor="vehicleType">Vehicle Type</label>
                <select
                  id="vehicleType"
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className={styles.select}
                >
                  <option value="">Select type</option>
                  <option value="cars">Cars</option>
                  <option value="motorcycles">Motorcycles</option>
                  <option value="trucks">Trucks</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="brand">Brand</label>
                <select
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className={styles.select}
                  disabled={!formData.vehicleType}
                >
                  <option value="">Select brand</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="model">Model</label>
                <select
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className={styles.select}
                  disabled={!formData.brand}
                >
                  <option value="">Select model</option>
                  {models.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="year">Year</label>
                <select
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className={styles.select}
                  disabled={!formData.model}
                >
                  <option value="">Select year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={!isFormValid}
              >
                🔍 Check Price
              </button>
              <button
                type="button"
                onClick={handleQuickSearch}
                className={styles.quickButton}
              >
                ⚡ Quick Search
              </button>
            </div>
          </form>
        </div>

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