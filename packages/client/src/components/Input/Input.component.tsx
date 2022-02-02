import React, { ChangeEvent, KeyboardEvent, useContext } from 'react';
import { InputGroup } from '@blueprintjs/core';
import { useRouter } from 'next/dist/client/router';
import { MainContext } from '../../context/MainContext';

function Input({
  setUserInput, userInput, gameMode, isTimeOut, didacticielStack,
}: any) {
  const route = useRouter();
  const {
    setComputedWords, computedWords, wordsStack,
    wordIndex, correctWords, setCorrectWords, setScore, score, setIsTimeOut,
    yFocusedPosition, yNextPosition, setOffSet, offSet, setWordIndex,
  } = useContext(MainContext);
  const isDidacticiel = route.pathname === '/didacticiel';
  function onSpacePress(e: KeyboardEvent) {
    if (e.code === 'Space' && userInput) {
      setComputedWords([...computedWords, isDidacticiel
        ? didacticielStack[wordIndex]
        : wordsStack[wordIndex],
      ]);

      /* Check if the word typed in training or didacticiel mode is correct */
      if (userInput === (isDidacticiel ? didacticielStack[wordIndex] : wordsStack[wordIndex])) {
        setCorrectWords([...correctWords, isDidacticiel
          ? didacticielStack[wordIndex]
          : wordsStack[wordIndex],
        ]);
        if (score) {
          setScore(score + 1);
        }
      }

      /* If user reach the end of the word set, end the game */
      if (wordsStack.length === computedWords.length + 1) {
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
