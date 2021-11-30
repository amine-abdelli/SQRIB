import { Dialog } from '@blueprintjs/core';
import React from 'react';
import { IModal } from './Modal.props';

function Modal({
  showModeSelection, setShowModeSelection, content,
}: IModal) {
  return (
    <Dialog
      isOpen={showModeSelection}
      onClose={() => {
        setShowModeSelection(false);
      }}
    >
      {content}
    </Dialog>
  );
}

export default Modal;
