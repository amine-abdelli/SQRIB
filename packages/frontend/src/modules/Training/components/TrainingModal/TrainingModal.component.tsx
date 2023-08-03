import React from 'react'
import Modal from '../../../../components/Modal/Modal.component'
import { Stats } from '../Stats/Stats.component'
import { Spacer, SpacerSize } from '../../../../components'
import { Tooltip } from 'react-tooltip'
import { Button } from '../../../../components/Button/Button.component'
import { ReplayModalProps } from '../ReplayModal/ReplayModal.component'

export interface StatsProps extends ReplayModalProps {
  nextStep: () => void
}

const TrainingModal = (props: ReplayModalProps) => {
  const { shouldOpenVictoryModal, setShouldOpenVictoryModal, resetTraining, resetTrainingAndRefetch, setShouldDisplayOption } = props;
  const [step, setStep] = React.useState<0 | 1>(0);
  function nextStep() {
    setStep(1)
  }
  const statsProps: StatsProps = { ...props, nextStep }
  
  function closeModal() {
    setShouldOpenVictoryModal(false)
    setStep(0)
  }
  return (
    <Modal isOpen={shouldOpenVictoryModal} setIsOpen={setShouldOpenVictoryModal}>
      <Modal.Body>
        {step === 0 && <Stats {...statsProps} />}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Spacer y size={SpacerSize.SMALL} />
            <Tooltip anchorSelect='.replay--button' place='top'>
              Replay the same words collection
            </Tooltip>
            <Tooltip anchorSelect='.new-game--button' place='top'>
              Generate new word set
            </Tooltip>
            <a className='replay--button'><Button onClick={() => {
              resetTraining()
              closeModal()
            }} label="Replay" /></a>
            <Spacer y size={SpacerSize.SMALL} />
            <a className="new-game--button"><Button onClick={() => {
              closeModal()
              resetTrainingAndRefetch()
            }} label="New words" /></a>
            <Spacer y size={SpacerSize.SMALL} />
            <a className="new-game--button"><Button onClick={() => {
              closeModal()
              setShouldDisplayOption(true)
            }} label="Change settings" stretch secondary /></a>
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export { TrainingModal }