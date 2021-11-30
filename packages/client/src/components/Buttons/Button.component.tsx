import React from 'react';
import { IButton } from './Button.props';

function Button({
  children, ...props
}: IButton) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      {...props}
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
