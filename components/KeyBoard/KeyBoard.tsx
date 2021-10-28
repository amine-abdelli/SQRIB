import React, { useEffect, useState } from 'react';
import { keyBoardLayout } from './keyBoardLayout';
import { KeyBoardEnum } from './KeyBoard.enum';
import styles from './KeyBoard.module.scss';

const KeyBoard = () => {
  const keyBoardKeys = keyBoardLayout[KeyBoardEnum.DEFAULT_AZERTY];
  const [indexPressed, setIndexPressed] = useState<any>(0);

  function onKeyPress(e: any) {
    console.log('hello')
    if (e.code === 'Space') {
      console.log('yo')
    }
    e.preventDefault();
  }
  useEffect(() => {
    function handleKeyDown(e: any) {
      setIndexPressed(e.code)
      console.log(e.code)
    }
    function handleKeyUp() {
      setIndexPressed('')
    }
    document.addEventListener('keydown', handleKeyDown);    
    document.addEventListener('keyup', handleKeyUp);
    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);      
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, []);

  return (
    <>
      <div className={styles.keyBoardWrapper}>
        {keyBoardLayout[KeyBoardEnum.DEFAULT_AZERTY].map((row) => {
          return (
            <div className={styles.keyBoardRow}>
              {row.split(" ").map((e, i) => {
                return <span style={{ transition: 'all 0.1s ease',backgroundColor: indexPressed === `${e}` ? 'blue' : 'red' }} className={styles.key}>{e}</span>
              })}
            </div>
          )
        })}
      </div> 
    </>
  )
}

export default KeyBoard
