import React from 'react';
import { Text } from '../Typography';
import styles from './Inputs.module.css';

interface SelectInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
}

interface TextInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção",
  required = false
}) => {
  return (
    <div className={styles.formGroup}>
      <Text as="label" htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </Text>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.select}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false
}) => {
  return (
    <div className={styles.formGroup}>
      <Text as="label" htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </Text>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={styles.input}
      />
    </div>
  );
};

const Inputs = {
  Select: SelectInput,
  Text: TextInput,
};

export default Inputs;