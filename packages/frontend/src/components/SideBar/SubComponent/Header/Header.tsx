import React from 'react';
import '../../SideBar.style.scss';
import SqribIcon from '../../../../assets/images/key-logo.png';

function Logo({ label }: {label: string}) {
  return <h1 className='logo--text'>{label}</h1>;
}

function Header() {
  return (
    <header className='sidebar-header'>
      <img className='logo' src={SqribIcon} alt="A key board logo" />
      <Logo label='SQRIB.IO' />
    </header>
  );
}

export { Header, Logo };
