import React from 'react';
import { Button } from '../Button/Button.component';
import { useAuthContext, useModal } from '../../contexts';
import Avatar from '../Avatar/Avatar.component';
import { MODAL_ID } from '../Modals/modals.constants';
import { Link, useLocation } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import { MAIN_ROUTES } from '../../routes/paths';
import './ToolBar.style.scss';


const ToolBar = () => {
  const { isAuthenticated, user } = useAuthContext();
  const { openModal } = useModal();
  const { pathname } = useLocation();

  return (
    <nav className={`toolbar ${pathname !== MAIN_ROUTES.HOME ? '' : 'hidden'}`} >
      <Link to={MAIN_ROUTES.HOME}><Button secondary stretch onClick={() => null} ><IoMdHome size={24} /></Button></Link>
      {isAuthenticated
        ? <Avatar username={user?.username || ''} avatarUrl={user?.avatar} />
        : <Button stretch secondary onClick={() => openModal(MODAL_ID.LOGIN)}>Login</Button>
      }
    </nav>
  )
}

export { ToolBar };