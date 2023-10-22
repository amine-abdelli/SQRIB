import React from 'react';
import { Link } from 'react-router-dom';
import { NavLinkProps } from './NavLink.props';
import { AuthGuard } from '../../../../modules/Auth/AuthGuard/AuthGuard.component';

import './NavLink.style.scss';

function NavLink({ to, label, currentPath, withAuth, disabled }: NavLinkProps) {
  const handleLinkClick = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
    }
  }, []);

  return (
    withAuth
      ? (<AuthGuard>
        <li className={`nav-link ${currentPath === to ? 'focused' : ''} ${disabled ? 'disabled' : ''}`}>
          <Link to={to} onClick={handleLinkClick}>{label}</Link>
        </li>
      </AuthGuard>)
      : (<li className={`nav-link ${currentPath === to ? 'focused' : ''} ${disabled ? 'disabled' : ''}`}>
        <Link to={to} onClick={handleLinkClick}>{label}</Link>
      </li>)
  );
}

export { NavLink };
