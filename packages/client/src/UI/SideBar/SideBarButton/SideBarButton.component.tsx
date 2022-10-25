import { useRouter } from 'next/router';
import React from 'react';
import { Routes } from '../../../utils/enums';
import styles from '../SideBar.module.scss';
import { ISideBarButton } from './SideBarButton.props';

function SideBarButton({
  text, onClick,
}: ISideBarButton) {
  const router = useRouter();
  const routeMatching: Record<string, string> = {
    [Routes.HOME]: 'LEADERBOARD',
    [Routes.MAIN]: 'ENTRAÎNEMENT',
    [Routes.DIDACTICIEL]: 'DIDACTICIEL',
    [Routes.MULTIGAMING]: 'MULTIJOUEUR',
  };
  const focusedPath = routeMatching[router.pathname];
  return (
    <div className={styles.sideBarButton} onClick={onClick}>
      {/* Highlight button corresponding to the current route pathname */}
      <p style={{ color: focusedPath === text ? '#D69C5D' : '' }}>{text}</p>
    </div>
  );
}

export default SideBarButton;
