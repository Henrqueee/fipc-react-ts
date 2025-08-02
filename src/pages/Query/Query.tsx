import React, { useState } from 'react';
import { useVehicleStore } from '../../store/useVehicleStore';
import styles from './Query.module.css';

const Query: React.FC = () => {
  const { 
    currentSearch, 
    updateCurrentSearch,
    resetCurrentSearch 
  } = useVehicleStore();
  
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { vehicleType, brand, model, year } = currentSearch;
    if (!vehicleType || !brand || !model || !year) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        ...currentSearch,
        price: '$45,000.00',
        month: 'December/2024',
        date: new Date().toLocaleDateString('en-US'),
        id: Math.random().toString(36).substr(2, 9),
      };
      setResult(mockResult);
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    resetCurrentSearch();
    setResult(null);
    setError(null);
  };

  return (
    <div className={styles.query}>
      <main className={styles.main}>
        <div className="container">
          <section className={styles.hero}>
            <h1 className={styles.title}>FIPE Query</h1>
            <p className={styles.subtitle}>
              Check your vehicle's value in the FIPE table
            </p>
          </section>

          <div className={styles.content}>
            <div className={styles.formSection}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Vehicle Data</h2>
                
                <div className={styles.formGroup}>
                  <label htmlFor="vehicleType">Vehicle Type *</label>
                  <select
                    id="vehicleType"
                    value={currentSearch.vehicleType}
                    onChange={(e) => updateCurrentSearch({ vehicleType: e.target.value })}
                    className={styles.select}
                  >
                    <option value="">Select type</option>
                    <option value="cars">Cars</option>
                    <option value="motorcycles">Motorcycles</option>
                    <option value="trucks">Trucks</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="brand">Brand *</label>
                  <select
                    id="brand"
                    value={currentSearch.brand}
                    onChange={(e) => updateCurrentSearch({ brand: e.target.value })}
                    className={styles.select}
                    disabled={!currentSearch.vehicleType}
                  >
                    <option value="">Select brand</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Ford">Ford</option>
                    <option value="Fiat">Fiat</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Hyundai">Hyundai</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="model">Model *</label>
                  <select
                    id="model"
                    value={currentSearch.model}
                    onChange={(e) => updateCurrentSearch({ model: e.target.value })}
                    className={styles.select}
                    disabled={!currentSearch.brand}
                  >
                    <option value="">Select model</option>
                    <option value="Gol">Gol</option>
                    <option value="Polo">Polo</option>
                    <option value="T-Cross">T-Cross</option>
                    <option value="Virtus">Virtus</option>
                    <option value="Nivus">Nivus</option>
                  </select>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="year">Year *</label>
                    <select
                      id="year"
                      value={currentSearch.year}
                      onChange={(e) => updateCurrentSearch({ year: e.target.value })}
                      className={styles.select}
                      disabled={!currentSearch.model}
                    >
                      <option value="">Select year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="fuel">Fuel</label>
                    <select
                      id="fuel"
                      value={currentSearch.fuel}
                      onChange={(e) => updateCurrentSearch({ fuel: e.target.value })}
                      className={styles.select}
                      disabled={!currentSearch.year}
                    >
                      <option value="">Select fuel</option>
                      <option value="Gasoline">Gasoline</option>
                      <option value="Ethanol">Ethanol</option>
                      <option value="Flex">Flex</option>
                      <option value="Diesel">Diesel</option>
                      <option value="CNG">CNG</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div className={styles.error}>
                    {error}
                  </div>
                )}

                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? 'Querying...' : 'Query Price'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className={styles.resetButton}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {result && (
              <div className={styles.resultSection}>
                <div className={styles.resultCard}>
                  <h3>Query Result</h3>
                  <div className={styles.resultDetails}>
                    <div className={styles.resultItem}>
                      <span className={styles.label}>Brand:</span>
                      <span className={styles.value}>{result.brand}</span>
                    </div>
                    <div className={styles.resultItem}>
                      <span className={styles.label}>Model:</span>
                      <span className={styles.value}>{result.model}</span>
                    </div>
                    <div className={styles.resultItem}>
                      <span className={styles.label}>Year:</span>
                      <span className={styles.value}>{result.year}</span>
                    </div>
                    <div className={styles.resultItem}>
                      <span className={styles.label}>Fuel:</span>
                      <span className={styles.value}>{result.fuel}</span>
                    </div>
                    <div className={styles.resultItem}>
                      <span className={styles.label}>Reference month:</span>
                      <span className={styles.value}>{result.month}</span>
                    </div>
                  </div>
                  <div className={styles.priceSection}>
                    <span className={styles.priceLabel}>FIPE Price:</span>
                    <span className={styles.price}>{result.price}</span>
                  </div>
                  <div className={styles.disclaimer}>
                    <p>
                      * This is the average market price according to the FIPE table. 
                      The actual value may vary depending on the vehicle's condition.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Query;