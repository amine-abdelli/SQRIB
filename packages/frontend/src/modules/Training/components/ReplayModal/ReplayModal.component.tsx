import React from 'react'
import Modal from '../../../../components/Modal/Modal.component';
import { EngineProps, Spacer, SpacerSize } from '../../../../components';
import { Button } from '../../../../components/Button/Button.component';

export interface ReplayModalProps extends EngineProps {
  shouldDisplayReplayModal: boolean;
  setShouldDisplayReplayModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShouldDisplayOption: React.Dispatch<React.SetStateAction<boolean>>
};

const ReplayModal = ({ shouldDisplayReplayModal, setShouldDisplayReplayModal, resetTraining, resetTrainingAndRefetch, setShouldDisplayOption, setIsUserAllowToType }: ReplayModalProps) => {
  const  closeModal = React.useCallback(() => setShouldDisplayReplayModal(false), [setShouldDisplayReplayModal])
  return (
    <Modal
      isOpen={shouldDisplayReplayModal}
      setIsOpen={setShouldDisplayReplayModal}
      closeable
      darkCross
    >
      <Modal.Body>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Spacer y size={SpacerSize.SMALL} />
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
            setIsUserAllowToType(true)
            setShouldDisplayOption(true)
            closeModal()
          }} label="Change settings" stretch secondary /></a>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export { ReplayModal }