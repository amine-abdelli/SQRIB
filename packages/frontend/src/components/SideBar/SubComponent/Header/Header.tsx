import React from 'react';
import '../../SideBar.style.scss';
import SqribIcon from '../../../../assets/images/key-logo.png';
import { Spacer, SpacerSize } from '../../../Spacer';

function Logo({ label }: {label: string}) {
  return <h1 className='logo--text'>{label}</h1>;
}

function Header() {
  return (
    <header className='sidebar-header'>
      <img className='logo' src={SqribIcon} alt="A key board logo" />
      <Spacer y size={SpacerSize.MEDIUM} />
      <Logo label='SQRIB.IO' />
      <Spacer y size={SpacerSize.MEDIUM} />
    </header>
  );
}

export { Header, Logo };
