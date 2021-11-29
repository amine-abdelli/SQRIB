import React from 'react';
import styles from './Nav.module.scss';
import { INav } from './Nav.props';

function Nav({ theme }: INav) {
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
}

export default Nav;
