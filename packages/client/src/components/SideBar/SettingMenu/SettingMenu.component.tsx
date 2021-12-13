import {
  Checkbox, Icon, Menu, MenuDivider, MenuItem, Switch,
} from '@blueprintjs/core';
import React, { useState } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { themes } from '../../../../styles/theme';
import { Language } from '../../../utils/enums/Language.enum';
import { FontSize } from '../../../utils/enums/FontSize.enum';
import { ISettingMenu } from './SettingMenu.props';

function SettingMenu({
  setTheme, setFontSize, setLanguage, submitLogout, theme, isLoggedIn, startCountDown,
}: ISettingMenu) {
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>();
  function onThemeChange(checked: boolean) {
    setIsSwitchChecked(!isSwitchChecked);
    if (checked) {
      setTheme(themes.DARK);
    } else {
      setTheme(themes.LIGHT);
    }
  }
  return (
    <Menu>
      <MenuItem
        icon={isSwitchChecked ? <BsSun size={20} /> : <BsMoon size={20} />}
        shouldDismissPopover={false}
        labelElement={<Switch style={{ padding: 0 }} alignIndicator="center" large onChange={(e: any) => onThemeChange(e.target.checked)} innerLabelChecked="light" innerLabel="dark" />}
      />
      <MenuDivider />
      <MenuItem disabled={startCountDown} icon="globe" text="Langue">
        <MenuItem onClick={() => setLanguage(Language.FR)} icon="flag" text="Français" />
        <MenuItem onClick={() => setLanguage(Language.EN)} icon="flag" text="Anglais" />
        <MenuItem onClick={() => setLanguage(Language.DE)} icon="flag" text="Allemand" />
        <MenuItem onClick={() => setLanguage(Language.ES)} icon="flag" text="Espagnole" />
      </MenuItem>
      <MenuDivider />
      <MenuItem icon="volume-off" text="Sons" shouldDismissPopover={false} labelElement={<Checkbox />} />
      <MenuItem icon="font" text="Taille">
        <MenuItem onClick={() => setFontSize(FontSize.SMALL)} icon={<Icon icon="font" size={12} />} text="Petit" />
        <MenuItem onClick={() => setFontSize(FontSize.MEDIUM)} icon={<Icon icon="font" size={16} />} text="Moyen" />
        <MenuItem onClick={() => setFontSize(FontSize.LARGE)} icon={<Icon icon="font" size={20} />} text="Grand" />
      </MenuItem>
      <MenuDivider />
      {isLoggedIn ? (<MenuItem icon="log-out" intent="none" onClick={() => submitLogout()} text="logout" />)
        : (<MenuItem icon="log-in" intent="none" text="login" />)}
    </Menu>
  );
}

export default SettingMenu;
