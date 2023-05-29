import React, { ReactElement } from 'react';
import { BsKeyboard } from 'react-icons/bs';
import { OverlayProps } from './Overlay.props';
import './Overlay.style.scss';

function Overlay({ isVisible, isUserAllowToType }: OverlayProps): ReactElement {
  return (
    <div
      className={`overlay--wrapper ${isVisible ? '' : 'hidden'}`}
    >
      <div className='overlay'>
          <BsKeyboard className='icon' size={40} />
        {isUserAllowToType ? 'Start typing to launch the timer': 'Press the START button'}
      </div>
    </div>
  );
}

export { Overlay };
