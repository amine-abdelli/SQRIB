import {
  Checkbox, Icon, Menu, MenuDivider, MenuItem,
} from '@blueprintjs/core';
import React from 'react';
import { themes } from '../../../../styles/theme';
import { Language } from '../../../helpers/enums/Language.enum';
import { FontSize } from '../../../helpers/enums/FontSize.enum';

function SettingMenu({ setTheme, setFontSize, setLanguage }: any) {
  return (
    <div>
      <Menu>
        <MenuItem icon="globe" text="Langue">
          <MenuItem onClick={() => setLanguage(Language.FR)} icon="flag" text="Français" />
          <MenuItem onClick={() => setLanguage(Language.EN)} icon="flag" text="Anglais" />
        </MenuItem>
        <MenuDivider />
        <MenuItem icon="lightbulb" text="Theme">
          <MenuItem onClick={() => setTheme(themes.DARK)} icon="full-circle" text="Dark" />
          <MenuItem onClick={() => setTheme(themes.LIGHT)} icon="circle" text="Light" />
        </MenuItem>
        <MenuItem icon="volume-off" text="Sons" shouldDismissPopover={false} labelElement={<Checkbox />} />
        <MenuItem icon="font" text="Taille">
          <MenuItem onClick={() => setFontSize(FontSize.SMALL)} icon={<Icon icon="font" size={12} />} text="Petit" />
          <MenuItem onClick={() => setFontSize(FontSize.MEDIUM)} icon={<Icon icon="font" size={16} />} text="Moyen" />
          <MenuItem onClick={() => setFontSize(FontSize.LARGE)} icon={<Icon icon="font" size={20} />} text="Grand" />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SettingMenu;
