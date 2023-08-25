import React from 'react'
import { Spacer, SpacerSize } from '../../../../../components'
import { CardButton } from '../../../../../components/CardButton/CardButton.component'
import { ReplayOptionsProps } from './ReplayOptions.props'

const ReplayOptions = ({ closeModal, resetTraining, resetTrainingAndRefetch, setShouldDisplayOption, setIsUserAllowToType }: ReplayOptionsProps) => {
  const openSettings = React.useCallback(() => {
    setShouldDisplayOption(true)
    closeModal()
  }, [setIsUserAllowToType, setShouldDisplayOption, closeModal])
  const generateNewWordSet = React.useCallback(() => { resetTrainingAndRefetch(); closeModal(); }, [resetTrainingAndRefetch, closeModal])
  const replay = React.useCallback(() => { resetTraining(); closeModal(); }, [resetTraining, closeModal])
  return (
    <div className='replay-option--wrapper'>
      <Spacer y size={SpacerSize.SMALL} />
      <CardButton
        shadowed
        label='Replay'
        subLabel='Replay the same words collection'
        onClick={replay}
      />
      <Spacer y size={SpacerSize.SMALL} />
      <CardButton
        shadowed
        label='New words'
        subLabel='New words based on current settings'
        onClick={generateNewWordSet}
      />
      <Spacer y size={SpacerSize.SMALL} />
      <CardButton
        shadowed
        onClick={openSettings}
        label="Settings"
        subLabel="Change session settings"
        secondary
      />
    </div>
  )
}

export { ReplayOptions }