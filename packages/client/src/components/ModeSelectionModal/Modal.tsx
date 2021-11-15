import { Dialog } from '@blueprintjs/core';
import React from 'react';

const Modal = ({ showModeSelection, setShowModeSelection, gameMode, content }: any) => {

  return (
    <Dialog isOpen={showModeSelection} onClose={() => {
      if(gameMode !== null) {
        setShowModeSelection(false)
      }
    }}>
        {content}
    </Dialog>
  )
}

export default Modal
