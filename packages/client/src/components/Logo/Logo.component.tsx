import React from 'react';
import styles from './Logo.module.scss';
import { LogoProps } from './Logo.props';

function Logo({ isMediumScreen }: LogoProps) {
  return (
    <p className={styles.logoText}>{!isMediumScreen ? 'SQRIB.IO' : 'S'}</p>
  );
}

export default Logo;
