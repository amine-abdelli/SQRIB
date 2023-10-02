import React, { createContext, useContext, useState, ReactNode } from 'react';
import Modal from '../components/Modal/Modal.component';
import { MODAL_ID } from '../components/Modals/modals.constants';

interface ModalContextType {
  activeModalIds: string[];
  modals: { [id: string]: ReactNode };
  registerModal: (id: string, content: ReactNode) => void;
  openModal: (id: ModalIdType) => void;
  closeModal: (id: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export type ModalIdType = typeof MODAL_ID[keyof typeof MODAL_ID];

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<{ [id: string]: ReactNode }>({});
  const [activeModalIds, setActiveModalIds] = useState<string[]>([]);

  const registerModal = (id: string, content: ReactNode) => {
    setModals(prevModals => ({ ...prevModals, [id]: content }));
  };


  const openModal = (id: ModalIdType) => {
    setActiveModalIds((prev) => [...prev.filter(anId => anId !== id), id]);
  };

  const closeModal = (id: string) => {
    setActiveModalIds((prev) => prev.filter((modalId) => modalId !== id));
  };

  return (
    <ModalContext.Provider value={{ activeModalIds, modals, registerModal, openModal, closeModal }}>
      {activeModalIds.map(modalId => <Modal
        key={modalId}
        isOpen={activeModalIds.includes(modalId)}
        setIsOpen={() => closeModal(modalId)}
        closeable
      >
        <Modal.Body>
          {modalId && modals[modalId]}
        </Modal.Body>
      </Modal>)}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export { ModalContext };
