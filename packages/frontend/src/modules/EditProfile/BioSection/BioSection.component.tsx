import React from 'react'
import { Text } from '../../../components/Text/Text.component'
import { Button } from '../../../components/Button/Button.component'
import { AiOutlineEdit } from 'react-icons/ai'
import { Spacer, SpacerSize } from '../../../components'
import { TextArea } from '../../../components/TextArea'
import { UseMutateAsyncFunction } from 'react-query'
import { UpdateUserRequestBody, UserBase } from '@sqrib/shared'
import { COLORS } from '../../../theme/colors'
import { ClosingCross } from '../../../components/ClosingCross/ClosingCross.component'

interface BioSectionProps {
  bio?: string,
  onBioSave: UseMutateAsyncFunction<UserBase, unknown, UpdateUserRequestBody, unknown>,
}

const BioSection = ({ bio, onBioSave }: BioSectionProps) => {
  const [currentBio, setCurrentBio] = React.useState<string>(bio || '')
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  return (
    <section className='edit-page-bio--wrapper'>
      <div className='edit-page-bio--title'>
        <Text fira h2 bold>Bio</Text>
        {isEditing
          ? <ClosingCross display dark fixed onClose={() => setIsEditing(!isEditing)} />
          : <Button secondary stretch onClick={() => setIsEditing(!isEditing)} label={<>
            <AiOutlineEdit /> Edit
          </>} />}
      </div>
      <Spacer y size={SpacerSize.MEDIUM} />
      {isEditing
        ? <TextArea value={currentBio} onChange={(e) => setCurrentBio(e.target.value)} />
        : bio ? <Text fira p>{currentBio}</Text> : <Text p fira color={COLORS.GREY}>No bio</Text>}
      <Spacer y size={SpacerSize.SMALL} />
      {isEditing && <Button stretch secondary style={{ height: '45px', alignSelf: 'flex-end', justifySelf: 'flex-end' }} onClick={async () => {
        await onBioSave({ description: currentBio })
        setIsEditing(false)
      }}>Save changes</Button>}
    </section>
  )
}

export { BioSection }