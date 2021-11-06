import React from 'react';
import styles from './SideBar.module.scss';

const LeftSideBar = ({theme, navigationState}: any) => {
  return (
    <div className={styles.leftSideBar} style={{ borderRight: `1px ${theme?.secondary} dashed` }}>
      {navigationState}
    </div>
  )
}

export default LeftSideBar;
