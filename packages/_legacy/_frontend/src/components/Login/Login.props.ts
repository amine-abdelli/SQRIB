export interface LoginProps {
  open: boolean;
  setOpen: (shouldOpenModal: boolean) => void;
}

export enum ModalType {
  LOGIN,
  SIGNUP
}
