import React from 'react';
import './Button.style.scss';
import { ButtonProps } from './Button.props';

function Button({
  label, onClick, secondary, stretch, disabled, className,
  color, light,
}: ButtonProps) {
  const buttonProps = {
    backgroundColor: secondary ? '#FFFFFF' : '',
    width: stretch ? '' : '100%',
    color,
    padding: stretch ? '5px 10px' : '',
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={buttonProps}
      className={`button--primary ${light ? 'button--light' : ''} ${className}`}
      type='submit'
    >
      {label}
    </button>
  );
}

export { Button };
