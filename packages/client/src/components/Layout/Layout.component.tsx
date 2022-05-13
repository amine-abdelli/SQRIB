import React, { useEffect, useRef } from 'react';
import styles from './Layout.module.scss';

function Layout({ children, theme }: any) {
  const layout = useRef(null);
  useEffect(() => {
    const domNode: any = layout.current;
    if (theme.theme === 'light') {
      domNode.classList.add('lightTheme');
      domNode.classList.remove('darkTheme');
    } else if (theme.theme === 'dark') {
      domNode.classList.add('darkTheme');
      domNode.classList.remove('lightTheme');
    }
  }, [theme.theme]);
  return (
    <div className={styles.gapLayoutWrapper} style={{ backgroundColor: theme?.tertiary, width: '100%' }}>
      <div ref={layout} className={styles.layoutWrapper} style={{ width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
