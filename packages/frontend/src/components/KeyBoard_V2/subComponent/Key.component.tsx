import React from 'react'
import { translateKeyBoardCode } from '../helpers/KeyBoard.helper';
import { expressKeyStyleProperty } from '../../../utils';
import '../KeyBoard.style.scss';
import { notRandomKey } from '../keyBoardLayout';
import { AiFillWindows } from 'react-icons/ai';
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
  const isShift = letter === 'Shift';
  const isCapsLock = letter === 'CapsLock';
  const isTab = letter === 'Tab';
  const isEnter = letter === 'Enter';
  const isWindow = letter === 'Window';

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
      `}
      style={{
        transform: isKeyPressedAndEnable ? 'scale(0.95)' : 'scale(0.99)',
        backgroundColor: expressKeyStyleProperty(letter, keyPressed, misspellings, enable),
      }}
    >
      {isWindow ? <AiFillWindows /> : translateKeyBoardCode(letter)}
    </span>
  )
}

export { Key }