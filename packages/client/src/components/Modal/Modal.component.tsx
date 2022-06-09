import { Modal as Dialog } from '@nextui-org/react';
import React from 'react';
import { IModal } from './Modal.props';

function Modal({
  isVisible, setIsVisible, content, className, closable,
}: IModal) {
  return (
    <Dialog
      closeButton={closable}
      className={className}
      open={isVisible}
      aria-labelledby="scoring modal"
      onClose={() => {
        setIsVisible(false);
      }}
    >
      {content}
    </Dialog>
  );
}

Modal.defaultProps = {
  closable: false,
};

export default Modal;
