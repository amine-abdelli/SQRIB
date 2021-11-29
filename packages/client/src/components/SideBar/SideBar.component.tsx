import { Popover2 } from '@blueprintjs/popover2';
import React from 'react';
import Link from 'next/link';
import styles from './SideBar.module.scss';
import SideBarButton from './SideBarButton/SideBarButton.component';
import SettingMenu from './SettingMenu/SettingMenu.component';
import { Position } from '../../helpers/enums/Direction.enum';
import { ISideBarProps } from './SideBar.props';
import { Routes } from '../../helpers/enums/Routes.enum';

function SideBar({
  setFontSize, setTheme, theme, position, setLanguage,
}: ISideBarProps) {
  return (
    position === Position.RIGHT && setLanguage && setTheme && setFontSize
      ? (
        <div
          className={styles.sideBarButtons}
          style={{
            color: theme?.secondary,
            borderLeft: `1px ${theme?.secondary} dashed`,
          }}
        >
          <ul style={{ width: '100%', padding: '10px' }}>
            <Link href={Routes.PROFILE} passHref>
              <SideBarButton themeColor={theme?.secondary} icon="person" text="Profile" />
            </Link>
            <Link href={Routes.MAIN} passHref>
              <SideBarButton themeColor={theme?.secondary} icon="ninja" text="Entraine toi !" />
            </Link>
            <Link href={Routes.MULTIGAMING} passHref>
              <SideBarButton themeColor={theme?.secondary} icon="multi-select" text="Multijoueur" />
            </Link>
            <Link href={Routes.MAIN} passHref>
              <SideBarButton themeColor={theme?.secondary} icon="chat" text="Chat" />
            </Link>
            <Link href={Routes.FEATURES} passHref>
              <SideBarButton themeColor={theme?.secondary} icon="document" text="Features" />
            </Link>
            <Popover2 className={styles.popover} content={<SettingMenu setLanguage={setLanguage} setTheme={setTheme} setFontSize={setFontSize} />} placement="right-end">
              <SideBarButton
                themeColor={theme?.secondary}
                icon="cog"
                text="Paramètres"
              />
            </Popover2>
          </ul>
        </div>
      )
      : (
        <div className={styles.leftSideBar} style={{ borderRight: `1px ${theme?.secondary} dashed`, width: '15%', minWidth: '10vh' }}>
          {/* {navigationState} */}
        </div>
      )
  );
}

export default SideBar;
