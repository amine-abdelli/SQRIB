import React, { useEffect, useState } from 'react';
import { keyBoardLayout } from './keyBoardLayout';
import { KeyBoardEnum } from './KeyBoard.enum';
import styles from './KeyBoard.module.scss';
import { translateKeyBoardCode } from './helpers/KeyBoard.helper';

const KeyBoard = ({ enable, theme }: { enable: boolean, theme: any }) => {
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

  function expressKeyStyleProperty(e: any, keyPressed: any){
    if(e === 'Escape') {
      return theme?.tertiary;
    } else if (keyPressed === e) {
      return theme?.secondary
    } else {
      return ''
    }
  }
  return (
    <>
      <div style={{ borderColor: theme?.secondary}} className={styles.keyBoardWrapper}>
        {keyBoardKeys.map((row) => {
          return (
            <div>
              <div className={styles.keyBoardRow}>
                {row.split(" ").map((e) => {
                  const isKeyPressedAndEnable = keyPressed === e && enable;
                  return <span 
                  className={styles.key}
                  style={{ 
                    borderColor: theme?.secondary,
                    opacity: !enable ? 0.6 : 1 ,
                    transform: isKeyPressedAndEnable ? `scale(0.95)` : `scale(1)`, 
                    backgroundColor: enable ? expressKeyStyleProperty(e, keyPressed) : 'grey', 
                    color: isKeyPressedAndEnable ? theme?.primary : theme?.secondary 
                  }} 
                  >
                    {translateKeyBoardCode(e)}
                  </span>
                })}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
};

export default KeyBoard;
