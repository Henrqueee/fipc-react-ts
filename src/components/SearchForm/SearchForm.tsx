import React, { useState, useEffect } from 'react';
import { useVehicleStore } from '../../store/useVehicleStore';
import useNavigation from '../../hooks/useNavigation';
import type { VehicleResult } from '../../store/useVehicleStore';
import { SearchButton, FavoriteButton } from '../UI/Buttons/Buttons';
import { SelectInput } from '../UI/Inputs/Inputs';
import { Text, Heading } from '../UI/Typography';
import { ToastContainer } from '../UI/Toast';
import SearchResultModal from '../SearchResultModal/SearchResultModal';
import { useForm } from '../../hooks/useForm';
import useFavorites from '../../hooks/useFavorites';
import useToast from '../../hooks/useToast';
import { VALIDATION_RULE_SETS } from '../../services/validationService';
import styles from './SearchForm.module.css';

interface SearchFormData extends Record<string, string> {
  vehicleType: string;
  brand: string;
  model: string;
  year: string;
  fuel: string;
}

const SearchForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<VehicleResult | null>(null);
  const { getNavigationState } = useNavigation();
  const { addToFavorites } = useFavorites();
  const { toasts, showToast, hideToast } = useToast();

  const { searchVehicle, updateCurrentSearch, isLoading, error } = useVehicleStore();
  
  const form = useForm<SearchFormData>({
    initialValues: {
      vehicleType: '',
      brand: '',
      model: '',
      year: '',
      fuel: ''
    },
    validationRules: {
      vehicleType: VALIDATION_RULE_SETS.REQUIRED_TEXT,
      brand: VALIDATION_RULE_SETS.REQUIRED_TEXT,
      model: VALIDATION_RULE_SETS.REQUIRED_TEXT,
      year: VALIDATION_RULE_SETS.REQUIRED_TEXT
    },
    onSubmit: async (values) => {
      updateCurrentSearch(values);
      setIsModalOpen(true);
      const result = await searchVehicle();
      setSearchResult(result);
    },
    enableToast: false
  });

  // Pre-fill vehicle type from navigation state
  useEffect(() => {
    const navigationState = getNavigationState();
    if (navigationState?.vehicleType) {
      form.setFieldValue('vehicleType', navigationState.vehicleType);
    }
  }, [getNavigationState, form]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    form.handleChange(id as keyof SearchFormData, value);
  };

  // Static data for simplification
  const brands = ['Volkswagen', 'Chevrolet', 'Fiat', 'Ford', 'Honda', 'Toyota'];
  const models = ['Gol', 'Polo', 'T-Cross', 'Virtus', 'Jetta', 'Tiguan'];
  const years = ['2024', '2023', '2022', '2021', '2020', '2019'];

  const handleAddToFavorites = () => {
    const { vehicleType, brand, model, year, fuel } = form.values;
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
      
      showToast(result.message, result.success ? 'success' : 'error');
    } else {
      showToast('Please fill in all required fields!', 'error');
    }
  };



  return (
    <div className={styles.searchForm}>
      <ToastContainer toasts={toasts} onClose={hideToast} />
      <div className="container">
        <div className={styles.formCard}>
          <Heading variant="large" level={2}>Check your vehicle's value</Heading>
          <Text className={styles.formDescription}>
            Select your vehicle information to check the value in the FIPE table
          </Text>
          
          <form onSubmit={form.handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <SelectInput
                id="vehicleType"
                label="Vehicle Type"
                value={form.values.vehicleType}
                onChange={handleInputChange}
                onBlur={() => form.handleBlur('vehicleType')}
                placeholder="Select type"
                options={[
                  { value: "cars", label: "Cars" },
                  { value: "motorcycles", label: "Motorcycles" },
                  { value: "trucks", label: "Trucks" }
                ]}
              />
              {form.errors.vehicleType && form.touched.vehicleType && (
                <Text className={styles.errorText}>{form.errors.vehicleType}</Text>
              )}

              <SelectInput
                id="brand"
                label="Brand"
                value={form.values.brand}
                onChange={handleInputChange}
                onBlur={() => form.handleBlur('brand')}
                placeholder="Select brand"
                options={brands.map(brand => ({ value: brand, label: brand }))}
              />
              {form.errors.brand && form.touched.brand && (
                <Text className={styles.errorText}>{form.errors.brand}</Text>
              )}
            </div>

            <div className={styles.formRow}>
              <SelectInput
                id="model"
                label="Model"
                value={form.values.model}
                onChange={handleInputChange}
                onBlur={() => form.handleBlur('model')}
                placeholder="Select model"
                options={models.map(model => ({ value: model, label: model }))}
              />
              {form.errors.model && form.touched.model && (
                <Text className={styles.errorText}>{form.errors.model}</Text>
              )}

              <SelectInput
                id="year"
                label="Year"
                value={form.values.year}
                onChange={handleInputChange}
                onBlur={() => form.handleBlur('year')}
                placeholder="Select year"
                options={years.map(year => ({ value: year, label: year }))}
              />
              {form.errors.year && form.touched.year && (
                <Text className={styles.errorText}>{form.errors.year}</Text>
              )}
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