import React from 'react'
import Modal from '../../../../components/Modal/Modal.component';
import { EngineProps, Spacer, SpacerSize } from '../../../../components';
import { ReplayOptions } from './ReplayOptions/ReplayOptions.component';

export interface ReplayModalProps extends EngineProps {
  shouldDisplayReplayModal: boolean;
  setShouldDisplayReplayModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShouldDisplayOption: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
};

const ReplayModal = ({ shouldDisplayReplayModal, setShouldDisplayReplayModal, resetTraining, resetTrainingAndRefetch, setShouldDisplayOption, setIsUserAllowToType, closeModal, ...props }: ReplayModalProps) => {
  const ReplayOptionsProps = { shouldDisplayReplayModal, setShouldDisplayReplayModal, resetTraining, resetTrainingAndRefetch, setShouldDisplayOption, setIsUserAllowToType, closeModal }
  return (
    <Modal
      isOpen={shouldDisplayReplayModal}
      setIsOpen={setShouldDisplayReplayModal}
      closeable
      darkCross
    >
      <Modal.Body>
        <ReplayOptions {...ReplayOptionsProps } />
      </Modal.Body>
    </Modal>
  )
}

export { ReplayModal }