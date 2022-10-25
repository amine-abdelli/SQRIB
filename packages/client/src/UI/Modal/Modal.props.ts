export interface ModalProps {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => boolean | void,
  children: any,
  blur?: boolean,
  closeable?: boolean,
  darkCross?: boolean
}

export interface SubComponentProps {
  children: JSX.Element,
}
