import React from 'react';

const Button = function ({
  children, ...props
}: any) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      {...props}
    >
      {children}
    </div>
  );
};

export default Button;
