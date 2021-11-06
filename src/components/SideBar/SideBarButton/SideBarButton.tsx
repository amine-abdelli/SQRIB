import { Icon } from '@blueprintjs/core';
import React from 'react';
import styles from '../SideBar.module.scss';

const SideBarButton = ({ text, onClick = null, icon, themeColor }: any) => {
  return (
    <div onClick={onClick}>
        <li className={styles.sideBarButton}>
          <span style={{borderColor: themeColor}} className={styles.top}></span>
           {<Icon style={{ color: themeColor, paddingRight: '5px' }} icon={icon} size={16} />} { <span style={{ fontSize: '18px'}}>{text}</span> }
          <span style={{borderColor: themeColor}} className={styles.bottom}></span>
        </li>
    </div>
  )
}

export default SideBarButton
