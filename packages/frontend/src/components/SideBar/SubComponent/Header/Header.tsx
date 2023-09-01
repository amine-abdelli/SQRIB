import React from 'react';
import SqribIcon from '../../../../assets/images/key-logo.png';
import { Spacer, SpacerSize } from '../../../Spacer';
import './Header.style.scss';

function Logo({ label, centered = false, size = 32, thin }: { label: string, centered?: boolean, size?: number, thin?: boolean }) {
  const classes = `logo--text ${centered ? 'logo--text--centered' : ''} ${thin ? 'logo--text--thin' : ''}`
  return <h1 className={classes} style={{ fontSize: `${size ? (size + 'px') : ''}` }}>{label}</h1>;
}

function Header() {
  return (
    <header className='header'>
      <img className='logo' src={SqribIcon} alt="A key board logo" />
      <Spacer y size={SpacerSize.MEDIUM} />
      <Logo label='SQRIB.IO' />
      <Spacer y size={SpacerSize.LARGE} />
    </header>
  );
}

export { Header, Logo };
