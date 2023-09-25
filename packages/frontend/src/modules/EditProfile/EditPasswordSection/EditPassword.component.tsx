import React from 'react'
import { Text } from '../../../components/Text/Text.component'
import { Spacer, SpacerSize } from '../../../components'
import { Input } from '../../Auth/components'
import { Button } from '../../../components/Button/Button.component'

const EditPassword = () => {
  return (
    <section className='edit-page-edit-password--wrapper'>
      <Text fira h2 bold>Change Password</Text>
      <Spacer y size={SpacerSize.MEDIUM} />
      <div className='edit-page-edit-password'>
        <div className='change-password--inputs'>
          <Input type='password' label='New password' name='New password' stretch onChange={() => console.log('lol')} />
          <Input type='password' label='Confirm Password' name='Confirm Password' stretch onChange={() => console.log('lol')} />
        </div>
        <Button stretch secondary style={{ height: '45px', margin: '1rem 0' }} onClick={() => null}>Save changes</Button>
      </div>
    </section>
  )
}

export { EditPassword }