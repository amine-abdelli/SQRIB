import React from 'react';
import { Link } from 'react-router-dom';
import { NavLinkProps } from './NavLink.props';
import './NavLink.style.scss';

function NavLink({ to, label, currentPath }: NavLinkProps) {
  return (
    <li className={`nav-link ${currentPath === to ? 'focused' : ''}`}><Link to={to}>{label}</Link></li>
  );
}

export { NavLink };
