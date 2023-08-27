import React from 'react';
import './Select.style.scss';
import { SelectProps } from './Select.props';

function Select({
  onChange, value, data, disabled = false
}: SelectProps) {
  return (
    <select
      style={{ padding: '0 1rem'}}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className="select"
      disabled={disabled}
    >
      {data.map(({ value: currentValue, label }) => (
        <option
          key={currentValue}
          value={currentValue}
        >
          {label}
        </option>
      ))}
    </select>
  );
}
export default Select;
