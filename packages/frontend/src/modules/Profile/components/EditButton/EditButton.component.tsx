import React from 'react'
import { Button } from '../../../../components/Button/Button.component'
import { Text } from '../../../../components/Text/Text.component'
import { Spacer, SpacerSize } from '../../../../components'
import { AiOutlineEdit } from 'react-icons/ai'
import { COLORS } from '../../../../theme/colors'

const EditButton = () => {
  return (
    <Button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: COLORS.GOLD, width: '3rem', margin: '0.5rem 0 0.5rem 0.5rem' }} onClick={() => null}>
      <>
        <Text fira bold>E</Text>
        <Text fira bold>D</Text>
        <Text fira bold>I</Text>
        <Text fira bold>T</Text>
        <Spacer y size={SpacerSize.SMALL} />
        <AiOutlineEdit />
      </>
    </Button>
  )
}

export { EditButton }