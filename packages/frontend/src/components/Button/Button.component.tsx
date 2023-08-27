import React from 'react';
import './Button.style.scss';
import { ButtonProps } from './Button.props';

function Button({
  label, onClick, secondary, stretch, disabled, className,
  color, light, style, children, link
}: ButtonProps) {
  const buttonStyle = {
    width: stretch ? '' : '100%',
    color,
    padding: stretch ? '5px 10px' : '',
    ...style
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={buttonStyle}
      className={`button--primary ${light ? 'button--light' : ''} ${link ? 'button--link button--light' : ''} ${secondary ? 'button--secondary' : ''} ${className}`}
      type='submit'
    >
      {children ? children : label}
    </button>
  );
}

export { Button };
