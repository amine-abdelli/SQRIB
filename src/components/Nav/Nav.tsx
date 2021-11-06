import React from 'react';
import styles from './Nav.module.scss';

const Nav = ({ theme }: any) => {
  return (
    <div className={styles.navbarContainer}>
      <div style={{ color: theme?.secondary ,fontSize:'40px',letterSpacing: '25px' ,textAlign: 'center' ,borderBottom: `1px ${theme?.secondary} solid`}} className={styles.navbarContent}>
        AQAYC
      </div>
    </div>
  )
}

export default Nav;
