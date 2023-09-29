import React from 'react'
import { Spacer, SpacerSize } from '../../../../../components'
import { Button } from '../../../../../components/Button/Button.component'

interface AvatarDeletionProps {
  deleteAvatar: () => void
}

const AvatarDeletion = ({ deleteAvatar }: AvatarDeletionProps) => {
  return (
    <div style={{ padding: '0.5rem' }}>
      Are you sure you want to delete your avatar?
      <Spacer y size={SpacerSize.SMALL} />
      <Button withTimeout onClick={deleteAvatar} stretch secondary>Confirm</Button>
    </div>
  )
}

export { AvatarDeletion }