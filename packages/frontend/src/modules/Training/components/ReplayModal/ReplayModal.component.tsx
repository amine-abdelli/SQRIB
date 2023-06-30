import React from 'react'
import Modal from '../../../../components/Modal/Modal.component';
import { EngineProps, Logo, Spacer, SpacerSize } from '../../../../components';
import { Button } from '../../../../components/Button/Button.component';
import { Tooltip } from 'react-tooltip'

export interface ReplayModalProps extends EngineProps {
  shouldDisplayReplayModal: boolean;
  setShouldDisplayReplayModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShouldDisplayOption: React.Dispatch<React.SetStateAction<boolean>>
};

const ReplayModal = ({ shouldDisplayReplayModal, setShouldDisplayReplayModal, resetTraining, resetTrainingAndRefetch, setShouldDisplayOption }: ReplayModalProps) => {
  function closeModal() {
    setShouldDisplayReplayModal(false)
  }
  return (
    <Modal
      isOpen={shouldDisplayReplayModal}
      setIsOpen={setShouldDisplayReplayModal}
    >
      <Modal.Body>
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
            resetTrainingAndRefetch()
            closeModal()
          }} label="New words" /></a>
          <Spacer y size={SpacerSize.SMALL} />
          <a className="new-game--button"><Button onClick={() => {
            setShouldDisplayOption(true)
            closeModal()
          }} label="Change settings" stretch secondary /></a>

        </div>
      </Modal.Body>
    </Modal>
  )
}

export { ReplayModal }