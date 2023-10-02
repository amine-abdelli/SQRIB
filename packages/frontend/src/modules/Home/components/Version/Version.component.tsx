import React from 'react'

import * as JsonPackage from '../../../../../../../package.json';
import { Text } from '../../../../components/Text/Text.component';

import './Version.style.scss'

const Version = () => {
  return (
    <Text fira className='app-version' size={12}>v{JsonPackage.version}-alpha</Text>
  )
}

export { Version };