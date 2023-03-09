import React from 'react';
import { RadioProps } from './Radio.props';
import styles from './Radio.module.scss';

function Radio({
  value, onChange, label, checked,
}: RadioProps) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label key={value} className={styles.radioButton}>
      <input
        type="radio"
        name="wordAmount"
        onChange={onChange}
        value={value}
        className='inline-block'
        checked={checked}
      />
      <span style={{ marginLeft: '5px' }}>{label}</span>
    </label>
  );
}

export default Radio;
