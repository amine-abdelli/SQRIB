import { Menu, MenuItem, Icon, MenuDivider, Checkbox } from '@blueprintjs/core';
import { Popover2 } from "@blueprintjs/popover2";
import React from 'react';
import { fontSize } from '../../helpers/fontsize.enum';
import { themes } from '../../../styles/theme';
import styles from './SideBar.module.scss';
import SideBarButton from './SideBarButton/SideBarButton';
import Link from 'next/link';

const SideBar = ({ setFontSize, setTheme, theme }: any) => {
  const settingMenu = (
    <Menu>
      <MenuItem icon="globe" text="Langue">
        <MenuItem icon="flag" text="Français" />
        <MenuItem icon="flag" text="Anglais" />
      </MenuItem>
      <MenuDivider />
      <MenuItem icon="lightbulb" text="Theme">
        <MenuItem onClick={() => setTheme(themes.DARK)} icon="full-circle" text="Dark" />
        <MenuItem onClick={() => setTheme(themes.LIGHT)} icon="circle" text="Light" />
      </MenuItem>
      <MenuItem icon="volume-off" text="Sons" shouldDismissPopover={false} labelElement={<Checkbox />} />
      <MenuItem icon="font" text="Taille">
        <MenuItem onClick={() => setFontSize(fontSize.SMALL)} icon={<Icon icon="font" size={12} />} text="Petit" />
        <MenuItem onClick={() => setFontSize(fontSize.MEDIUM)} icon={<Icon icon="font" size={16} />} text="Moyen" />
        <MenuItem onClick={() => setFontSize(fontSize.LARGE)} icon={<Icon icon="font" size={20} />} text="Grand" />
      </MenuItem>
    </Menu>
  );
  return (
    <div style={{ color: theme?.secondary, height: '80vh', borderLeft: `1px ${theme?.secondary} dashed`, alignItems: 'center' }}>
      <ul style={{ width: '15vw', padding: '10px' }}>
        <Link href='/Main/Main'>
          <SideBarButton themeColor={theme?.secondary} icon="ninja" text="Entraine toi !" />
        </Link>
        <Link href='/Multigaming/Multigaming'>
          <SideBarButton themeColor={theme?.secondary} icon="multi-select" text="Multijoueur" />
        </Link>
        <Popover2 className={styles.popover} content={settingMenu} placement="right-end">
          <SideBarButton themeColor={theme?.secondary} icon="cog" text="Paramètres" />
        </Popover2>
      </ul>
    </div>
  )
}

export default SideBar
