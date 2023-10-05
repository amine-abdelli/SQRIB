import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MAIN_ROUTES } from '../../routes/paths';
import { IoMdHome } from 'react-icons/io';
import { Card } from '../Card/Card.component';
import { ArrowLeft } from 'react-iconly';
import { Tooltip } from '../ToolTip/ToolTip.component';
import './HomeButton.style.scss';

const HomeButton = () => {
  return (
    <Link to={MAIN_ROUTES.HOME} style={{ height: '3rem', width: '3rem' }}><Card shadowed width="30rem" centered style={{ padding: 0, margin: 0, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ><IoMdHome size={24} /></Card></Link>
  )
}

interface BackButtonProps {
  isStatic?: boolean;
}

const BackButton = ({ isStatic }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <div className={isStatic ? '' : 'home-button'} onClick={() => navigate(-1)} style={{ height: '3rem', width: '3rem' }}>
      <Card shadowed width="30rem" centered style={{ padding: 0, margin: 0, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <Tooltip size={12} direction='right' content="Back to your profile">
          <ArrowLeft size={24} />
        </Tooltip>
      </Card>
    </div>
  )
}

export { HomeButton, BackButton };