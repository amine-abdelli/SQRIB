import React from 'react';
import Logo from '../../../../assets/images/key-logo.png';

function Header() {
  return (
    <header className='sidebar-header'>
      <img className='logo' src={Logo} alt="A key board logo" />
      <h1 className='logo--text'>SQRIB.IO</h1>
    </header>
  );
}

export { Header };
