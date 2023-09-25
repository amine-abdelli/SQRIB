import React from 'react'
import { Text } from '../../../components/Text/Text.component'
import { Spacer, SpacerSize } from '../../../components'
import { COLORS } from '../../../theme/colors'
import { Button } from '../../../components/Button/Button.component'

const DeleteAccountSection = () => {
  return (
    <section className='edit-page-delete-account--wrapper'>
      <Text fira h2 bold color={COLORS.ERROR}>Delete account</Text>
      <Spacer y size={SpacerSize.MEDIUM} />
      <Text p fira color={COLORS.ERROR}>Deleting your account is a permanent action that cannot be undone. This will erase all your scores, settings, and personal information from our database. If you're sure you want to proceed, click 'Delete Account'. Otherwise, you can cancel to keep your account intact.</Text>
      <Spacer y size={SpacerSize.MEDIUM} />
      <Button onClick={() => null} stretch style={{ alignSelf: 'flex-end', background: COLORS.ERROR, color: 'white' }}>Delete Account</Button>
    </section>
  )
}

export { DeleteAccountSection }