import React from 'react'
import { translateKeyBoardCode } from '../helpers/KeyBoard.helper';
import { expressKeyStyleProperty } from '../../../utils';
import { notRandomKey } from '../keyBoardLayout';
import { AiFillWindows, AiOutlineLock } from 'react-icons/ai';
import { BsCapslock } from 'react-icons/bs';
import '../KeyBoard.style.scss';
import { COLORS } from '../../../theme/colors';

interface IKeyProps {
  letter: string;
  enable: boolean;
  misspellings: string[];
  isKeyPressedAndEnable?: boolean;
  keyPressed: string;
  showCase?: boolean
}

const Key = ({ letter, isKeyPressedAndEnable, keyPressed, misspellings, enable, showCase }: IKeyProps) => {
  const isNotRandomKey = notRandomKey.includes(letter)
  const isSpaceBar = letter === 'Space';
  const isBackSpace = letter === 'Backspace' || letter === 'Enter';
  const isShift = letter === 'ShiftLeft' || letter === 'ShiftRight';
  const isCapsLock = letter === 'CapsLock';
  const isTab = letter === 'Tab';
  const isEnter = letter === 'Enter';
  const isCtrl = letter === 'ControlLeft' || letter === 'ControlRight';
  const isSqrib = letter === 'sqrib';
  const isWindow = letter === 'Window';
  const whitelist = ['ShiftLeft', 'ShiftRight', 'Window', 'CapsLock', 'sqrib'];

  let icon = null;
  if (isShift) {
    icon = <BsCapslock />
  } else if (isWindow) {
    icon = <AiFillWindows className='key__icon' />
  } else if (isCapsLock) {
    icon = <AiOutlineLock />
  } else if (isSqrib) {
    icon = ""
  }

  return (
    <span
      key={letter}
      className={`key
      ${showCase ? 'stretch' : ''} 
      ${isKeyPressedAndEnable ? 'key--pressed' : ''} 
      ${isNotRandomKey ? '' : 'key--key'} 
      ${isSpaceBar ? 'key--grow' : ''} 
      ${isBackSpace ? 'key--backspace' : ''}
      ${isShift ? 'key--shift' : ''}
      ${isTab ? 'key--tab' : ''}
      ${isEnter ? 'key--enter' : ''}
      ${isCapsLock ? 'key--capsLock' : ''}
      ${isCtrl ? 'key--ctrl' : ''}
      ${isSqrib ? 'key--sqrib' : ''}
      `}
    >
      <span
        style={{
          transform: isKeyPressedAndEnable ? 'scale(0.95)' : 'scale(0.99)',
          backgroundColor: expressKeyStyleProperty(letter, keyPressed, misspellings, enable),
          color: isSqrib ? COLORS.GOLD : 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {whitelist.includes(letter) ? icon : translateKeyBoardCode(letter)}
      </span>
    </span>
  )
}

export { Key }