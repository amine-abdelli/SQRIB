import React from 'react'
import * as JsonPackage from '../../../../../package.json';
import './Version.style.scss'

const Version = () => {
  return (
    <span className='app-version'>v{JsonPackage.version}</span>
  )
}

export { Version };