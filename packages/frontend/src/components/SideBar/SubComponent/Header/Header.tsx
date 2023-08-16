import React from 'react';
import SqribIcon from '../../../../assets/images/key-logo.png';
import { Spacer, SpacerSize } from '../../../Spacer';
import '../../SideBar.style.scss';

function Logo({ label, centered = false }: {label: string, centered?: boolean}) {
  const classes = `logo--text ${centered ? 'logo--text--centered' : ''}`
  return <h1 className={classes}>{label}</h1>;
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
