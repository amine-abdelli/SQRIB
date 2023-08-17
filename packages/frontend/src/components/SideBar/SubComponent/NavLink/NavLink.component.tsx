import React from 'react';
import { Link } from 'react-router-dom';
import { NavLinkProps } from './NavLink.props';
import './NavLink.style.scss';
import { AuthGuard } from '../../../../modules/Auth/AuthGuard/AuthGuard.component';

function NavLink({ to, label, currentPath, withAuth }: NavLinkProps) {
  return (
    withAuth ?
      <AuthGuard>
        <li className={`nav-link ${currentPath === to ? 'focused' : ''}`}><Link to={to}>{label}</Link></li>
      </AuthGuard>
      : <li className={`nav-link ${currentPath === to ? 'focused' : ''}`}><Link to={to}>{label}</Link></li>
  );
}

export { NavLink };
