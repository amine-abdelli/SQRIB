import { Icon } from '@blueprintjs/core';
import React from 'react';
import styles from '../SideBar.module.scss';
import { ISideBarButton } from './SideBarButton.props';

function SideBarButton({
  text, onClick, icon, themeColor,
}: ISideBarButton) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.sideBarButton} onClick={onClick}>
      <li>
        <Icon style={{ color: themeColor, paddingRight: '5px' }} icon={icon} />
        <span style={{ fontSize: '18px' }}>{text}</span>
      </li>
    </div>
  );
}

export default SideBarButton;
