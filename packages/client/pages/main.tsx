import React, {
  KeyboardEvent, useContext, useEffect,
} from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { Scoring } from '../src/components/Scoring/Scoring';
import { Displayer } from '../src/components/Displayer/Displayer';
import KeyBoard from '../src/components/KeyBoard/KeyBoard';
import { MainContext } from '../src/contexts/MainContext';
import DisplayerHeader from '../src/components/DisplayerHeader/DisplayerHeader';
import RefreshButton from '../src/components/Buttons/RefreshButton/RefreshButton';

function Main() {
  const {
    userInput,
    wordIndex,
    wordCount,
    isTimeOut,
    setIsTimeOut,
    startCountDown,
    setStartCountDown,
    gameMode,
    wordsStack,
    computedWords,
    setComputedWords,
    correctWords,
    setCorrectWords,
    setWordCount,
    setWordIndex,
    setUserInput,
    score,
    setScore,
    offSet,
    setOffSet,
    yFocusedPosition,
    yNextPosition,
    theme,
    setShowModeSelection,
  } = useContext(MainContext);

  useEffect(() => {
    if (userInput && startCountDown === false) {
      setStartCountDown(true);
    }
  }, [userInput]);

  function onSpacePress(e: KeyboardEvent) {
    if (e.code === 'Space') {
      setWordCount(wordCount + 1);
      setComputedWords([...computedWords, wordsStack[wordIndex]]);
      /* Check if the word typed is correct */
      if (userInput === wordsStack[wordIndex]) {
        setCorrectWords([...correctWords, wordsStack[wordIndex]]);
        if (score) {
          setScore(score + 1);
        }
      }

      /* If user reach the end of the word set, end the game */
      if (wordsStack.length === wordCount + 1) {
        setIsTimeOut(true);
      }

      /* If the offset between to span is over 5 px it means that we broke the line and
      we can move the card upward */

      if (yNextPosition && (yNextPosition - yFocusedPosition!) > 5) {
        setOffSet(offSet! - ((yNextPosition - yFocusedPosition! - 2)));
      }

      setWordIndex(wordIndex + 1);
      setUserInput('');
      e.preventDefault();
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <DisplayerHeader />
      {gameMode !== null && <Button style={{ position: 'absolute', top: 200 }} onClick={() => setShowModeSelection(true)}>Changer de mode</Button>}
      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
        <Scoring />
        <RefreshButton />
      </div>
      <div className="flex justify-center">
        <Displayer />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <InputGroup
          style={{ width: '100%' }}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          onKeyDown={(event) => onSpacePress(event)}
          asyncControl
          disabled={isTimeOut || gameMode === null}
          large
          placeholder="Start typing here..."
        />
      </div>
      <KeyBoard theme={theme} enable={startCountDown && !isTimeOut} />
    </div>
  );
}
export default Main;
