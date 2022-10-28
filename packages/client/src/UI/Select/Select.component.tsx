import { Languages } from '@sqrib/utils';
import React from 'react';
import styles from './Select.module.scss';
import { SelectProps } from './Select.props';

function Select({ onChange, value }: SelectProps) {
  return (
    <select
      onChange={(e) => onChange(e.target.value as Languages)}
      value={value}
      className={styles.select}
    >
      <option value="fr">🇫🇷</option>
      <option value="en">🏴󠁧󠁢󠁥󠁮󠁧󠁿</option>
      <option value="es">🇪🇸</option>
      <option value="de">🇩🇪</option>
    </select>
  );
}
export default Select;
