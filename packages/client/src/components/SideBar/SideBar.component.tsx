import React from 'react';
import Link from 'next/link';
import { GiNinjaHead } from 'react-icons/gi';
import { BsKeyboard, BsChatDots } from 'react-icons/bs';
import { MdOutlineFeaturedVideo } from 'react-icons/md';
import { CgGames } from 'react-icons/cg';
import { ImStatsBars } from 'react-icons/im';
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
                <SideBarButton themeColor={theme?.secondary} icon={<ImStatsBars style={{ marginRight: '5px' }} size={20} />} text="Profil" />
              </Link>
            )}
            <Link href={Routes.MAIN} passHref>
              <SideBarButton themeColor={theme?.secondary} icon={<GiNinjaHead style={{ marginRight: '5px' }} size={20} />} text="Entraînement" />
            </Link>
            <Link href={Routes.DIDACTICIEL} passHref>
              <SideBarButton themeColor={theme?.secondary} icon={<BsKeyboard style={{ marginRight: '5px' }} size={20} />} text="Didacticiel" />
            </Link>
            <Link href={Routes.MULTIGAMING} passHref>
              <SideBarButton themeColor={theme?.secondary} icon={<CgGames style={{ marginRight: '5px' }} size={20} />} text="Multijoueur" />
            </Link>
            {isLoggedIn && (
              <Link href={Routes.MAIN} passHref>
                <SideBarButton themeColor={theme?.secondary} icon={<BsChatDots style={{ marginRight: '5px' }} size={20} />} text="Chat" />
              </Link>
            )}
            <Link href={Routes.FEATURES} passHref>
              <SideBarButton themeColor={theme?.secondary} icon={<MdOutlineFeaturedVideo style={{ marginRight: '5px' }} size={20} />} text="Features" />
            </Link>
          </ul>
        </div>
      )
      : (
        <div className={styles.leftSideBar} style={{ borderRight: `1px ${theme?.secondary} dashed`, width: '15%', minWidth: '10vh' }} />
      )
  );
}

export default SideBar;
