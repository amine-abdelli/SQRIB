import { Dialog } from '@blueprintjs/core';
import React from 'react';

const Modal = function ({
  showModeSelection, setShowModeSelection, gameMode, content,
}: any) {
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
};

export default Modal;
