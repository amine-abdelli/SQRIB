import {
  Checkbox, Icon, Menu, MenuDivider, MenuItem,
} from '@blueprintjs/core';
import React from 'react';
import { themes } from '../../../../styles/theme';
import { Language } from '../../../utils/enums/Language.enum';
import { FontSize } from '../../../utils/enums/FontSize.enum';
import { ISettingMenu } from './SettingMenu.props';

function SettingMenu({ setTheme, setFontSize, setLanguage }: ISettingMenu) {
  return (
    <div>
      <Menu>
        <MenuItem icon="globe" text="Langue">
          <MenuItem onClick={() => setLanguage(Language.FR)} icon="flag" text="Français" />
          <MenuItem onClick={() => setLanguage(Language.EN)} icon="flag" text="Anglais" />
          <MenuItem onClick={() => setLanguage(Language.DE)} icon="flag" text="Allemand" />
          <MenuItem onClick={() => setLanguage(Language.ES)} icon="flag" text="Espagnole" />
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
