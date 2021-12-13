import React from 'react';
import Link from 'next/link';
import styles from './SideBar.module.scss';
import SideBarButton from './SideBarButton/SideBarButton.component';
import { Position } from '../../utils/enums/Direction.enum';
import { ISideBarProps } from './SideBar.props';
import { Routes } from '../../utils/enums/Routes.enum';
import { useGetSelf } from '../../hooks/useGetSelf';

function SideBar({
  setFontSize, setTheme, theme, position, setLanguage,
}: ISideBarProps) {
  const { isLoggedIn } = useGetSelf();

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
            {isLoggedIn && (
            <Link href={Routes.PROFILE} passHref>
              <SideBarButton themeColor={theme?.secondary} icon="person" text="Profile" />
            </Link>
            )}
            <Link href={Routes.MAIN} passHref>
              <SideBarButton themeColor={theme?.secondary} icon="ninja" text="Entraine toi !" />
            </Link>
            <Link href={Routes.MULTIGAMING} passHref>
              <SideBarButton themeColor={theme?.secondary} icon="multi-select" text="Multijoueur" />
            </Link>

            {isLoggedIn && (
            <Link href={Routes.MAIN} passHref>
              <SideBarButton themeColor={theme?.secondary} icon="chat" text="Chat" />
            </Link>
            )}
            <Link href={Routes.FEATURES} passHref>
              <SideBarButton themeColor={theme?.secondary} icon="document" text="Features" />
            </Link>
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
