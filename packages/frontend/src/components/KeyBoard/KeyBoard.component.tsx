import React, { useEffect, useState } from 'react';
import { keyBoardLayout } from './keyBoardLayout';
import { KeyBoardEnum } from './KeyBoard.enum';
import './KeyBoard.style.scss';
import { translateKeyBoardCode } from './helpers/KeyBoard.helper';
import { expressKeyStyleProperty } from '../../utils';

function KeyBoard({ enable, misspellings }: { enable: boolean, misspellings: string[] }) {
  const [keyPressed, setKeyPressed] = useState<string>('');
  const keyBoardKeys: string[] = keyBoardLayout[KeyBoardEnum.DEFAULT_QWERTY];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      setKeyPressed(e.key);
    }
    function handleKeyUp() {
      setKeyPressed('');
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div style={{ border: 'none' }} className='keyBoardWrapper'>
      {keyBoardKeys.map((row: string, i: number) => (
        <div key={row[i]}>
          <div className='keyBoardRow' style={{ cursor: enable ? 'pointer' : 'not-allowed' }}>
            {row?.split(' ').map((key: string) => {
              const isKeyPressedAndEnable: boolean = keyPressed === key && enable;
              return (
                <span
                  key={key}
                  className='key'
                  style={{
                    transform: isKeyPressedAndEnable ? 'scale(0.95)' : 'scale(0.99)',
                    backgroundColor: enable ? expressKeyStyleProperty(key, keyPressed, misspellings) : 'grey',
                  }}
                >
                  {translateKeyBoardCode(key)}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default KeyBoard;
