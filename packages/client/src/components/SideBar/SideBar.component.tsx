import React from 'react';
import Link from 'next/link';
import { GiNinjaHead } from 'react-icons/gi';
import { Game, Chart, Setting } from 'react-iconly';
import { BsKeyboard } from 'react-icons/bs';
import styles from './SideBar.module.scss';
import SideBarButton from './SideBarButton/SideBarButton.component';
import { Position } from '../../utils/enums/Direction.enum';
import { ISideBarProps } from './SideBar.props';
import { Routes } from '../../utils/enums/Routes.enum';
import { useGetSelf } from '../../hooks/useGetSelf';

function SideBar({
  setFontSize, position, setLanguage,
}: ISideBarProps) {
  const { isLoggedIn } = useGetSelf();
  return (
    position === Position.RIGHT && setLanguage && setFontSize
      ? (
        <div
          className={styles.sideBarButtons}
        >
          <ul style={{ width: '100%', margin: '2px', color: 'inherit' }}>
            {isLoggedIn && (
              <Link href={Routes.PROFILE} passHref>
                <SideBarButton icon={<Chart style={{ marginRight: '5px' }} size={20} />} text="Profil" />
              </Link>
            )}
            <Link href={Routes.MAIN} passHref>
              <SideBarButton icon={<GiNinjaHead style={{ marginRight: '5px' }} size={20} />} text="Entraînement" />
            </Link>
            <Link href={Routes.DIDACTICIEL} passHref>
              <SideBarButton icon={<BsKeyboard style={{ marginRight: '5px' }} size={20} />} text="Didacticiel" />
            </Link>
            <Link href={Routes.MULTIGAMING} passHref>
              <SideBarButton icon={<Game style={{ marginRight: '5px' }} size={20} />} text="Multijoueur" />
            </Link>
            <Link href={Routes.SETTINGS} passHref>
              <SideBarButton icon={<Setting style={{ marginRight: '5px' }} size={20} />} text="Settings" />
            </Link>
          </ul>
        </div>
      )
      : (
        <div className={styles.leftSideBar} style={{ borderRight: '1px dashed', width: '15%', minWidth: '10vh' }} />
      )
  );
}

export default SideBar;
