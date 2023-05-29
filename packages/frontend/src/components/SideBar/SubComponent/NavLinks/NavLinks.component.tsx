import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from '../NavLink/NavLink.component';
import { MAIN_ROUTES } from '../../../../routes/paths';

function NavLinks() {
  const { pathname } = useLocation();
  return (
    <ul className='nav-link--wrapper'>
      <NavLink currentPath={pathname} to={MAIN_ROUTES.TRAINING} label='Training' />
      <NavLink currentPath={pathname} to={MAIN_ROUTES.LEARNING} label='Learning' />
      <NavLink currentPath={pathname} to={MAIN_ROUTES.MULTIPLAYER} label='Multiplayer' />
      <NavLink currentPath={pathname} to={MAIN_ROUTES.LEADERBOARD} label='LeaderBoard' />
      <NavLink currentPath={pathname} to={MAIN_ROUTES.SETTINGS} label='Settings' />
    </ul>
  );
}

export { NavLinks };
