import React from 'react';
import ClosingCross from '../ClosingCross/ClosingCross.component';
import { ModalProps } from './Modal.props';
import styles from './Modal.module.scss';

function Modal({
  isOpen, setIsOpen, children, closeable, blur, darkCross,
}: ModalProps) {
  const subComponentList = Object.keys(Modal);
  const subComponents = subComponentList
    .map((key) => React.Children
      .map(children, (child) => (child?.type.name === key ? child : null)));
  return (
    <>
      <div className={styles.modalWrapper} style={{ display: isOpen ? 'block' : 'none' }}>
        <ClosingCross display={!!closeable} onClose={setIsOpen} dark={darkCross} />
        <div>{subComponents}</div>
      </div>
      {isOpen && <div onClick={() => setIsOpen(false)} style={{ backdropFilter: `blur(${blur ? '3' : '0'}px)` }} className={styles.overlay} />}
    </>
  );
}

function Header(props: any) {
  // eslint-disable-next-line react/destructuring-assignment
  return (props.children && <div style={{ marginBottom: '15px', ...props.style }}>{props.children}</div>);
}
function Body(props: any) {
  // eslint-disable-next-line react/destructuring-assignment
  return (props.children && <div style={{ margin: '15px 0', ...props.style }}>{props.children}</div>);
}
function Footer(props: any) {
  // eslint-disable-next-line react/destructuring-assignment
  return (props.children && <div style={{ marginTop: '15px', ...props.style }}>{props.children}</div>);
}

// This order must be respected to display subcomponents in the right order
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

Modal.defaultProps = {
  darkCross: false,
};

export default Modal;
