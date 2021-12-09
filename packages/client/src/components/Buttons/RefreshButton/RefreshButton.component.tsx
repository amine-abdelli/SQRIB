import { Button } from '@blueprintjs/core';
import React, { useContext } from 'react';
import { shuffleWordsStack } from '@aqac/utils';
import { MainContext } from '../../../context/MainContext';
import { GameOptions } from '../../../utils/mode';

function RefreshButton() {
  const {
    setIsTimeOut,
    setStartCountDown,
    gameMode,
    setWordsStack,
    setComputedWords,
    setCorrectWords,
    setCountDown,
    setWordCount,
    setWordIndex,
    setUserInput,
    setScore,
    setOffSet,
    language,
    theme,
  } = useContext(MainContext);

  function onRestart() {
    setWordsStack(shuffleWordsStack(language, GameOptions[gameMode].stackLength));
    setStartCountDown(false);
    setUserInput('');
    setWordCount(0);
    setScore(0);
    setWordIndex(0);
    setOffSet(0);
    setCorrectWords([]);
    setComputedWords([]);
    setIsTimeOut(false);
    setCountDown(GameOptions[gameMode]?.timer);
  }
  return (
    <Button
      style={{
        marginLeft: '30px',
        backgroundColor: theme?.tertiary,
        borderRadius: '25px',
      }}
      intent="success"
      icon="refresh"
      onClick={() => onRestart()}
    />
  );
}

export default RefreshButton;
