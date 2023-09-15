import React from 'react';
import './Spinner.style.scss';

interface SpinnerProps {
  size?: number;
}

const Spinner = ({ size }: SpinnerProps) => {
  return (
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  )
}

export { Spinner }