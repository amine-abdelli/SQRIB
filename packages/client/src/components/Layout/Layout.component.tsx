import React from 'react';
import styles from './Layout.module.scss';

function Layout({ children, theme }: any) {
  return (
    <div className={styles.gapLayoutWrapper} style={{ backgroundColor: theme?.tertiary, width: '100%' }}>
      <div className={styles.layoutWrapper} style={{ backgroundColor: theme?.primary, width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
