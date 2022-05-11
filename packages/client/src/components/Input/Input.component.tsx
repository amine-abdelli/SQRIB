import React, { KeyboardEvent, useContext } from 'react';
import { useRouter } from 'next/dist/client/router';
import { Input as MainInput } from '@nextui-org/react';
import { MainContext } from '../../context/MainContext';

function Input({
  setUserInput, userInput, gameMode, isTimeOut, didacticielStack, disabled,
}: any) {
  const route = useRouter();
  const {
    setComputedWords, computedWords, wordsStack,
    wordIndex, correctWords, setCorrectWords, setScore, score, setIsTimeOut,
    yFocusedPosition, yNextPosition, setOffSet, offSet, setWordIndex,
  } = useContext(MainContext);
  const isDidacticiel = route.pathname === '/didacticiel';
  const isMultigaming = route.pathname === '/multigaming/[roomID]';
  // If a player join an already started game, he can't write in the input
  const isMultigamerAndNotAllowToPlay = disabled && isMultigaming;
  function onSpacePress(e: KeyboardEvent) {
    if (e.code === 'Space' && userInput) {
      setComputedWords([...computedWords, userInput]);

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
    <MainInput
      aria-label='formulaire de saisie principal'
      className='w100'
      onChange={(e) => setUserInput(e.target.value)}
      value={userInput}
      fullWidth
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => onSpacePress(event)}
      disabled={((isTimeOut) && !userInput) || isMultigamerAndNotAllowToPlay}
      placeholder="Start typing here..."
    />
  );
}

export default Input;
