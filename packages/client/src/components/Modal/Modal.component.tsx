import { Dialog } from '@blueprintjs/core';
import React from 'react';
import { IModal } from './Modal.props';

function Modal({
  showModeSelection, setShowModeSelection, content, className,
}: IModal) {
  return (
    <Dialog
      className={className}
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
