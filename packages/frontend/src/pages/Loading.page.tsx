import React from 'react';
import { Logo } from '../components';
import '../theme/pages/_Loading.scss'

const Loading = () => {
  return (
    <main className='layout--main loading--main'>
      <Logo label='L' size={78} />
      <Logo label='o' size={78} />
      <Logo label='a' size={78} />
      <Logo label='d' size={78} />
      <Logo label='i' size={78} />
      <Logo label='n' size={78} />
      <Logo label='g' size={78} />
      <Logo label='.' size={78} />
      <Logo label='.' size={78} />
      <Logo label='.' size={78} />
    </main>
  )
}

export default Loading