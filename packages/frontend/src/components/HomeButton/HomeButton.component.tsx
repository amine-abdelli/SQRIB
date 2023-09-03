import React from 'react'
import { Link } from 'react-router-dom';
import { MAIN_ROUTES } from '../../routes/paths';
import { IoMdHome } from 'react-icons/io';
import { Card } from '../Card/Card.component';

const HomeButton = () => {
  return (
    <Link to={MAIN_ROUTES.HOME} style={{ height: '3rem', width: '3rem' }}><Card shadowed width="30rem" centered style={{ padding: 0, margin: 0, height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ><IoMdHome size={24} /></Card></Link>
  )
}

export { HomeButton };