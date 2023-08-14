import React from 'react'
import { translateKeyBoardCode } from '../helpers/KeyBoard.helper';
import { expressKeyStyleProperty } from '../../../utils';
import '../KeyBoard.style.scss';
interface IKeyProps {
  letter: string;
  enable: boolean;
  misspellings: string[];
  isKeyPressedAndEnable?: boolean;
  keyPressed: string;
  showCase?: boolean
}

const Key = ({ letter, isKeyPressedAndEnable, keyPressed, misspellings, enable, showCase }: IKeyProps) => {
  return (
    <span
      key={letter}
      className={`key ${showCase ? 'stretch' : ''}`}
      style={{
        transform: isKeyPressedAndEnable ? 'scale(0.95)' : 'scale(0.99)',
        backgroundColor: expressKeyStyleProperty(letter, keyPressed, misspellings, enable),
      }}
    >
      {translateKeyBoardCode(letter)}
    </span>
  )
}

export { Key }