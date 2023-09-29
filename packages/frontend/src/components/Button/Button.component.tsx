import React from 'react';

import { ButtonProps } from './Button.props';
import { useTimeoutButton } from '../../hooks/useTimeoutButton.hook';

import './Button.style.scss';

function Button({
  label, onClick, secondary, stretch, disabled, className,
  color, light, style, children, link, withTimeout
}: ButtonProps) {

  const [handleClick, isDisabled] = useTimeoutButton(onClick, 2000)

  const buttonStyle = {
    width: stretch ? '' : '100%',
    color,
    padding: stretch ? '5px 10px' : '',
    ...style
  };
  return (
    <button
      disabled={disabled || isDisabled}
      onClick={withTimeout ? handleClick : onClick}
      style={buttonStyle}
      className={`button--primary ${light ? 'button--light' : ''} ${link ? 'button--link button--light' : ''} ${secondary ? 'button--secondary' : ''} ${className}`}
      type='submit'
    >
      {children ? children : label}
    </button>
  );
}

export { Button };
