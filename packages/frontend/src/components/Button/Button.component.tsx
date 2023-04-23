import React from 'react';
import './Button.style.scss';
import { ButtonProps } from './Button.props';

function Button({
  label, onClick, secondary, stretch, disabled, className,
  color,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: secondary ? '#FFFFFF' : '',
        width: stretch ? '' : '100%',
        color,
      }}
      className={`button--primary ${className}`}
      type='submit'
    >
      {label}
    </button>
  );
}

export default Button;
