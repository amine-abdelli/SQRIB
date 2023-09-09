import React from 'react';
import './Loader.style.scss';

const Loader = () => {
  return (
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  )
}

export { Loader }