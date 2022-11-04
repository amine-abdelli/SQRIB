import React from 'react';
import styles from './Select.module.scss';
import { SelectProps } from './Select.props';

function Select({ onChange, value, data }: SelectProps) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className={styles.select}
    >
      {data.map(({ value: currentValue, label }) => (
        <option
          key={currentValue}
          value={typeof currentValue === 'string' ? currentValue.toLowerCase() : currentValue}
        >
          {label}
        </option>
      ))}
    </select>
  );
}
export default Select;
