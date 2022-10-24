import { useRouter } from 'next/router';
import React from 'react';
import styles from '../SideBar.module.scss';
import { ISideBarButton } from './SideBarButton.props';

function SideBarButton({
  text, onClick,
}: ISideBarButton) {
  const router = useRouter();
  const routeMatching: Record<string, string> = {
    '/': 'LEADERBOARD',
    '/main': 'ENTRAÎNEMENT',
    '/didacticiel': 'DIDACTICIEL',
    '/multigaming': 'MULTIJOUEUR',
  };
  const focusedPath = routeMatching[router.pathname];
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.sideBarButton} onClick={onClick}>
      <p style={{ color: focusedPath === text ? '#D69C5D' : '' }}>{text}</p>
    </div>
  );
}

export default SideBarButton;
