import React from 'react';
import { ClosingCross } from '../ClosingCross/ClosingCross.component';
import { ModalProps } from './Modal.props';
import './Modal.style.scss';

function Modal({
  isOpen, setIsOpen, children, closeable, blur, darkCross, fullScreen, style,
  sqribBackground,
}: ModalProps) {
  const subComponentList = Object.keys(Modal);
  const subComponents = subComponentList
    .map((key) => React.Children
      .map(children, (child) => (child?.type.name === key ? child : null)));

  const fullScreenStyle = (fullScreen && isOpen) ? {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    transform: 'translate(0%, 0%)',
  } : {};

  return (
    <>
      <div
        className={sqribBackground ? 'sqrib-background' : 'modal--wrapper'}
        style={{
          ...style, ...fullScreenStyle as any, display: isOpen ? 'block' : 'none',
        }}
      >
        {setIsOpen && <ClosingCross display={true} onClose={setIsOpen} dark={darkCross} />}
        {subComponents}
      </div>
      {isOpen && <div onClick={() => setIsOpen && setIsOpen(false)} style={{ backdropFilter: `blur(${blur ? '3' : '0'}px)` }} className='overlay' />}
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
