import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from '../NavLink/NavLink.component';
import { MAIN_ROUTES } from '../../../../routes/paths';
import './NavLinks.style.scss';

function NavLinks() {
  const { pathname } = useLocation();
  return (
    <ul className='nav-link--wrapper'>
      <NavLink currentPath={pathname} to={MAIN_ROUTES.TRAINING} label='Training' />
      <NavLink currentPath={pathname} to={MAIN_ROUTES.MULTIPLAYER} label='Multiplayer' />
      <NavLink currentPath={pathname} to={MAIN_ROUTES.LEADERBOARD} label='LeaderBoard' />
      <NavLink withAuth currentPath={pathname} to={MAIN_ROUTES.PROFILE} label='Profile' />
    </ul>
  );
}

export { NavLinks };
