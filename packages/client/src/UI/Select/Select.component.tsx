import { Languages } from '@sqrib/utils';
import React from 'react';
import styles from './Select.module.scss';
import { SelectProps } from './Select.props';

function Select({ onChange, value, data }: SelectProps) {
  return (
    <select
      onChange={(e) => onChange(e.target.value as Languages)}
      value={value}
      className={styles.select}
    >
      {data.map((item) => (
        <option
          key={item}
          value={typeof item === 'string' ? item.toLowerCase() : item}
        >
          {item}
        </option>
      ))}
    </select>
  );
}
export default Select;
