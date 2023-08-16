import React from 'react'
import { ModalIdType, useModal } from '../../../contexts/ModalContext'

interface ModalDefProps {
  id: ModalIdType;
  component: React.ReactNode;
  children?: React.ReactNode;
}

const ModalDef = ({ id, component, children }: ModalDefProps) => {
  const { registerModal } = useModal();
  React.useEffect(() => {
    // Here, 'yourModalId' is an identifier you give to your modal.
    registerModal(id, component);
  }, []);
  return <>{children}</>;
}

export { ModalDef }