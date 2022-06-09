import { Icon } from '@blueprintjs/core';
import { Text } from '@nextui-org/react';
import React from 'react';
import styles from '../SideBar.module.scss';
import { ISideBarButton } from './SideBarButton.props';

function SideBarButton({
  text, onClick, icon,
}: ISideBarButton) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.sideBarButton} onClick={onClick}>
      <li>
        <Icon style={{ paddingRight: '5px' }} icon={icon} />
        <Text size={18} color='inherit' style={{ color: '#dfdad2'}}>{text}</Text>
      </li>
    </div>
  );
}

export default SideBarButton;
