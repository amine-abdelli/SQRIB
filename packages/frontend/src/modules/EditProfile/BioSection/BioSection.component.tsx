import React from 'react'
import { Text } from '../../../components/Text/Text.component'
import { Button } from '../../../components/Button/Button.component'
import { AiOutlineEdit } from 'react-icons/ai'
import { Spacer, SpacerSize } from '../../../components'
import { TextArea } from '../../../components/TextArea'

const BioSection = () => {
  return (
    <section className='edit-page-bio--wrapper'>
      <div className='edit-page-bio--title'>
        <Text fira h2 bold>Bio</Text>
        <Button secondary stretch onClick={() => null} label={<>
          <AiOutlineEdit /> Edit
        </>} />
      </div>
      <Spacer y size={SpacerSize.MEDIUM} />
      <TextArea />
      <Spacer y size={SpacerSize.SMALL} />
      <Button stretch secondary style={{ height: '45px', alignSelf: 'flex-end', justifySelf: 'flex-end' }} onClick={() => null}>Save changes</Button>
    </section>
  )
}

export { BioSection }