import React, { FC } from 'react';
import { ClosingCross } from '../ClosingCross/ClosingCross.component';
import { ModalComponents, ModalProps, SubcomponentProps } from './Modal.props';
import './Modal.style.scss';

const Modal: FC<ModalProps> & ModalComponents = ({
  isOpen,
  setIsOpen,
  children,
  closeable,
  blur,
  fullScreen,
  style,
  sqribBackground
}) => {

  const renderSubcomponent = (name: string) =>
    React.Children.toArray(children).find(child =>
      React.isValidElement(child) && child.type === (Modal as any)[name]
    );

  const fullScreenStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    transform: 'translate(0%, 0%)',
  };

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(fullScreen && isOpen ? fullScreenStyle : {}),
    display: isOpen ? 'block' : 'none'
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={sqribBackground ? 'sqrib-background' : 'modal--wrapper'}
        style={combinedStyle}
      >
        {setIsOpen && <ClosingCross display={!!closeable} onClose={setIsOpen} dark />}
        {renderSubcomponent('Header')}
        {renderSubcomponent('Body')}
        {renderSubcomponent('Footer')}
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen && closeable && setIsOpen(false)}
          style={{ backdropFilter: `blur(${blur ? '3' : '0'}px)` }}
          className='overlay'
        />
      )}
    </>
  );
};


const Subcomponent: FC<SubcomponentProps> = ({ children, style }) => {
  return children ? <div style={style}>{children}</div> : null;
};

const Header = (props: any) => <Subcomponent {...props} style={{ marginBottom: '15px', ...props.style }} />;
const Body = (props: any) => <Subcomponent {...props} style={{ margin: '15px 0', ...props.style }} />;
const Footer = (props: any) => <Subcomponent {...props} style={{ marginTop: '15px', ...props.style }} />;

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
