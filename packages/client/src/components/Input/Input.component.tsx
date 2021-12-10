import React, { ChangeEvent, KeyboardEvent, useContext } from 'react';
import { InputGroup } from '@blueprintjs/core';
import { MainContext } from '../../context/MainContext';

function Input({
  setUserInput, userInput, gameMode, isTimeOut,
}: any) {
  const {
    setWordCount, wordCount, setComputedWords, computedWords, wordsStack,
    wordIndex, correctWords, setCorrectWords, setScore, score, setIsTimeOut,
    yFocusedPosition, yNextPosition, setOffSet, offSet, setWordIndex,
  } = useContext(MainContext);
  function onSpacePress(e: KeyboardEvent) {
    if (e.code === 'Space' && userInput) {
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
    <InputGroup
      style={{ width: '100%' }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
      value={userInput}
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => onSpacePress(event)}
      asyncControl
      disabled={(isTimeOut || gameMode === null) && !userInput}
      large
      placeholder="Start typing here..."
    />
  );
}

export default Input;
