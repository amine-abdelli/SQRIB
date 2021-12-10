import React from 'react';
import { IButton } from './Button.props';

function Button({
  children, style, className, onClick,
}: IButton) {
  return (
    <div
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

Button.defaultProps = {
  style: {},
  className: '',
};

export default Button;
