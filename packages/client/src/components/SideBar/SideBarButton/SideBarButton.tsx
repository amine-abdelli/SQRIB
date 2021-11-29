import { Icon } from '@blueprintjs/core';
import React from 'react';
import styles from '../SideBar.module.scss';

const SideBarButton = function ({
  text, onClick = null, icon, themeColor,
}: any) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div onClick={onClick}>
      <li className={styles.sideBarButton}>
        <span style={{ borderColor: themeColor }} className={styles.top} />
        <Icon style={{ color: themeColor, paddingRight: '5px' }} icon={icon} size={16} />
        {' '}
        <span style={{ fontSize: '18px' }}>{text}</span>
        <span style={{ borderColor: themeColor }} className={styles.bottom} />
      </li>
    </div>
  );
};

export default SideBarButton;
