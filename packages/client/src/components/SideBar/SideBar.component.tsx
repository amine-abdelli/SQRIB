import { Popover2 } from '@blueprintjs/popover2';
import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '@aqac/api';
import styles from './SideBar.module.scss';
import SideBarButton from './SideBarButton/SideBarButton.component';
import SettingMenu from './SettingMenu/SettingMenu.component';
import { Position } from '../../utils/enums/Direction.enum';
import { ISideBarProps } from './SideBar.props';
import { Routes } from '../../utils/enums/Routes.enum';
import { useGetSelf } from '../../hooks/useGetSelf';

function SideBar({
  setFontSize, setTheme, theme, position, setLanguage,
}: ISideBarProps) {
  const [submitLogout] = useMutation(LOGOUT_MUTATION);
  const { isLoggedIn, data } = useGetSelf();
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
          {isLoggedIn ? (
            <>
              {data?.self?.email}
              <Button onClick={() => submitLogout()}>
                logout
              </Button>
            </>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            >
              <div style={{
                backgroundColor: theme?.secondary,
                display: 'flex',
                alignItems: 'center',
                borderRadius: '50px',
                border: '1px solid #343434',
                width: '50px',
                height: '50px',
              }}
              />
              <Button href="login" type="link">
                se connecter
              </Button>
            </div>
          )}
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
            <Popover2
              className={styles.popover}
              placement="right-end"
              content={(
                <SettingMenu
                  setLanguage={setLanguage}
                  setTheme={setTheme}
                  setFontSize={setFontSize}
                />
              )}
            >
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
