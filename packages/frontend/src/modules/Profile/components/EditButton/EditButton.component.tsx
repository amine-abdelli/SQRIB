import React from 'react'
import { Button } from '../../../../components/Button/Button.component'
import { Text } from '../../../../components/Text/Text.component'
import { Spacer, SpacerSize } from '../../../../components'
import { AiOutlineEdit } from 'react-icons/ai'
import { MAIN_ROUTES } from '../../../../routes/paths'
import { useNavigate } from 'react-router-dom'
import './EditButton.style.scss'

const EditButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      stretch
      className='edit--button'
      onClick={() => navigate(MAIN_ROUTES.EDIT_PROFILE)}
    >
      <>
        <Text className='edit--button__letter' fira bold>E</Text>
        <Text className='edit--button__letter' fira bold>D</Text>
        <Text className='edit--button__letter' fira bold>I</Text>
        <Text className='edit--button__letter' fira bold>T</Text>
        <Spacer y size={SpacerSize.SMALL}  />
        <AiOutlineEdit />
      </>
    </Button>
  )
}

export { EditButton }