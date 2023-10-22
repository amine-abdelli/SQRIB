import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from '../NavLink/NavLink.component';
import { MAIN_ROUTES } from '../../../../routes/paths';
import { Badge } from '../../../Badge/Badge.component';

import './NavLinks.style.scss';

function NavLinks() {
  const { pathname } = useLocation();
  return (
    <ul className='nav-link--wrapper'>
      <NavLink currentPath={pathname} to={MAIN_ROUTES.TRAINING} label='Training' />
      <NavLink currentPath={pathname} to={MAIN_ROUTES.MULTIPLAYER} label='Multiplayer' />
      <Badge content='SOON' x={-19} y={0}>
        <NavLink currentPath={pathname} to={MAIN_ROUTES.LEADERBOARD} label='LeaderBoard' disabled />
      </Badge>
      <NavLink withAuth currentPath={pathname} to={MAIN_ROUTES.PROFILE} label='Profile' />
    </ul>
  );
}

export { NavLinks };
