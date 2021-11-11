import { Menu, MenuItem, Icon, MenuDivider, Checkbox } from '@blueprintjs/core';
import { Popover2 } from "@blueprintjs/popover2";
import React from 'react';
import { fontSize } from '../../helpers/fontsize.enum';
import { themes } from '../../../styles/theme';
import styles from './SideBar.module.scss';
import SideBarButton from './SideBarButton/SideBarButton';
import Link from 'next/link';
import SettingMenu from './SettingMenu/SettingMenu';

const SideBar = ({ setFontSize, setTheme, theme, position, navigationState, setLanguage }: any) => {
  return (
    position === 'right' ?
      <div style={{ color: theme?.secondary, height: '80vh', borderLeft: `1px ${theme?.secondary} dashed`, alignItems: 'center', width: '15%', minWidth: '10vh' }}>
        <ul style={{ width: '100%', padding: '10px' }}>
          <Link href='/Main/Main'>
            <SideBarButton themeColor={theme?.secondary} icon="ninja" text="Entraine toi !" />
          </Link>
          <Link href='/Multigaming/Multigaming'>
            <SideBarButton themeColor={theme?.secondary} icon="multi-select" text="Multijoueur" />
          </Link>
          <Popover2 className={styles.popover} content={<SettingMenu setLanguage={setLanguage} setTheme={setTheme} setFontSize={setFontSize} />} placement="right-end">
            <SideBarButton themeColor={theme?.secondary} icon="cog" text="Paramètres" />
          </Popover2>
        </ul>
      </div>
      :
      <div className={styles.leftSideBar} style={{ borderRight: `1px ${theme?.secondary} dashed`, width: '15%', minWidth: '10vh' }}>
        {navigationState}
      </div>
  )
}

export default SideBar
