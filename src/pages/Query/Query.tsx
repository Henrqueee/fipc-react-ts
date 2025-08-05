import React, { useState } from 'react';
import { useVehicleStore } from '../../store/useVehicleStore';
import { SelectInput } from '../../components/UI/Inputs/Inputs';
import { QueryButton } from '../../components/UI/Buttons/Buttons';
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
                <SelectInput
                  id="vehicleType"
                  label="Vehicle Type"
                  value={currentSearch.vehicleType}
                  onChange={(e) => updateCurrentSearch({ vehicleType: e.target.value })}
                  placeholder="Select type"
                  required
                  options={[
                    { value: "cars", label: "Cars" },
                    { value: "motorcycles", label: "Motorcycles" },
                    { value: "trucks", label: "Trucks" }
                  ]}
                />

                <SelectInput
                  id="brand"
                  label="Brand"
                  value={currentSearch.brand}
                  onChange={(e) => updateCurrentSearch({ brand: e.target.value })}
                  placeholder="Select brand"
                  required
                  disabled={!currentSearch.vehicleType}
                  options={[
                    { value: "Volkswagen", label: "Volkswagen" },
                    { value: "Chevrolet", label: "Chevrolet" },
                    { value: "Ford", label: "Ford" },
                    { value: "Fiat", label: "Fiat" },
                    { value: "Toyota", label: "Toyota" },
                    { value: "Honda", label: "Honda" },
                    { value: "Hyundai", label: "Hyundai" }
                  ]}
                />

                <SelectInput
                  id="model"
                  label="Model"
                  value={currentSearch.model}
                  onChange={(e) => updateCurrentSearch({ model: e.target.value })}
                  placeholder="Select model"
                  required
                  disabled={!currentSearch.brand}
                  options={[
                    { value: "Gol", label: "Gol" },
                    { value: "Polo", label: "Polo" },
                    { value: "T-Cross", label: "T-Cross" },
                    { value: "Virtus", label: "Virtus" },
                    { value: "Nivus", label: "Nivus" }
                  ]}
                />

                <div className={styles.formRow}>
                  <SelectInput
                    id="year"
                    label="Year"
                    value={currentSearch.year}
                    onChange={(e) => updateCurrentSearch({ year: e.target.value })}
                    placeholder="Select year"
                    required
                    disabled={!currentSearch.model}
                    options={[
                      { value: "2024", label: "2024" },
                      { value: "2023", label: "2023" },
                      { value: "2022", label: "2022" },
                      { value: "2021", label: "2021" },
                      { value: "2020", label: "2020" },
                      { value: "2019", label: "2019" }
                    ]}
                  />

                  <SelectInput
                    id="fuel"
                    label="Fuel"
                    value={currentSearch.fuel}
                    onChange={(e) => updateCurrentSearch({ fuel: e.target.value })}
                    placeholder="Select fuel"
                    disabled={!currentSearch.year}
                    options={[
                      { value: "Gasoline", label: "Gasoline" },
                      { value: "Ethanol", label: "Ethanol" },
                      { value: "Flex", label: "Flex" },
                      { value: "Diesel", label: "Diesel" },
                      { value: "CNG", label: "CNG" }
                    ]}
                  />
                </div>

                {error && (
                  <div className={styles.error}>
                    {error}
                  </div>
                )}

                <div className={styles.formActions}>
                  <QueryButton
                    type="submit"
                    loading={loading}
                    onClick={() => {}}
                  >
                    {loading ? 'Consultando...' : 'Consultar Preço'}
                  </QueryButton>
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