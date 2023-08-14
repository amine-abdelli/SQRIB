import React from 'react';
import './Checkbox.style.scss';
import { CheckboxProps } from './Checkbox.props';

function Checkbox({
  onClick, checked
}: CheckboxProps) {
  return (
      <input className='checkbox' type="checkbox" onClick={onClick} checked={checked} />
  );
}

export { Checkbox };
