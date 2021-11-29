import React from 'react';
import styles from './Layout.module.scss';

const Layout = function ({ children, theme }: any) {
  return (
    <div className={styles.gapLayoutWrapper} style={{ backgroundColor: theme?.tertiary }}>
      <div className={styles.layoutWrapper} style={{ backgroundColor: theme?.primary }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
