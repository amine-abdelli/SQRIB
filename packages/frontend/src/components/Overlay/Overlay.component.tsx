import React, { ReactElement } from 'react';
import { BsKeyboard } from 'react-icons/bs';
import { OverlayProps } from './Overlay.props';
import './Overlay.style.scss';
import { TrainingMode } from '../Options/Options.props';

function Overlay({ isVisible, isUserAllowToType, mode }: OverlayProps): ReactElement {
  const message = mode === TrainingMode.TIME_TRIAL ? 'Start typing to launch the count down' : 'Start typing to launch the timer'
  return (
    <div
      className={`overlay--wrapper ${isVisible ? '' : 'hidden'}`}
    >
      <div className='overlay'>
        <BsKeyboard className='icon' size={40} />
        {isUserAllowToType ? message : 'Press the START button'}
      </div>
    </div>
  );
}

export { Overlay };
