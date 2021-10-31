import React, { useEffect, useState } from 'react';
import { keyBoardLayout } from './keyBoardLayout';
import { KeyBoardEnum } from './KeyBoard.enum';
import styles from './KeyBoard.module.scss';
import { translateKeyBoardCode } from './helpers/KeyBoard.helper';

const KeyBoard = () => {
  const [keyPressed, setKeyPressed] = useState<any>(0);
  const keyBoardKeys = keyBoardLayout[KeyBoardEnum.DEFAULT_AZERTY];

  useEffect(() => {
    function handleKeyDown(e: any) {
      setKeyPressed(e.key);
    }
    function handleKeyUp() {
      setKeyPressed('')
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, []);

  return (
    <>
      <div className={styles.keyBoardWrapper}>
        {keyBoardKeys.map((row) => {
          return (
            <>
              <div className={styles.keyBoardRow}>
                {row.split(" ").map((e, i) => {
                  return <span style={{ transition: 'all 0s ease', backgroundColor: keyPressed === `${e}` ? 'blue' : '' }} className={styles.key}>{translateKeyBoardCode(e)}</span>
                })}
              </div>
            </>
          )
        })}
      </div>
    </>
  )
};

export default KeyBoard;
