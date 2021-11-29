import React from 'react';
import styles from './Nav.module.scss';

const Nav = function ({ theme }: any) {
  return (
    <div className={styles.navbarContainer}>
      <div
        className={styles.navbarContent}
        style={{ color: theme?.secondary, borderBottom: `1px ${theme?.secondary} solid` }}
      >
        にぎやか
      </div>
    </div>
  );
};

export default Nav;
