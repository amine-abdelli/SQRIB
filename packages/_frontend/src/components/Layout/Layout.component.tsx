import React, { useRef } from 'react';
import { theme } from '../../../styles/theme';
import styles from './Layout.module.scss';

function Layout({ children }: any) {
  const layout = useRef(null);
  return (
    <div className={styles.gapLayoutWrapper} style={{ backgroundColor: theme.tertiary, width: '100%' }}>
      <div
        ref={layout}
        className={styles.layoutWrapper}
        style={{ width: '100%', backgroundColor: theme.secondary }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
