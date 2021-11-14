import React, { KeyboardEvent, useEffect, useState } from 'react';
import { shuffleWordsStack, spreadLetters } from '../../src/helpers/displayer.helper';
import { Button, Icon, InputGroup } from '@blueprintjs/core';
import { Scoring } from '../../src/components/Scoring/Scoring';
import { WordsDisplayer } from '../../src/components/WordsDisplayer/WordsDisplayer';
import { Dispatch, SetStateAction } from '../../interfaces/Main.interfaces';
import KeyBoard from '../../src/components/KeyBoard/KeyBoard';
import { fontSize as font_size } from '../../src/helpers/FontSize.enum';
import { GameMode } from '../../src/helpers/Mode.enum';

interface IMainProps {
  startCountDown: boolean,
  setStartCountDown: Dispatch<SetStateAction<boolean>>,
  fontSize: number,
  theme: any,
  isTimeOut: boolean,
  setIsTimeOut: any
}

function Main({ setFontSize, fontSize, theme, router, setNavigationState, language }: any) {
  const [wordsStack, setWordsStack] = useState<Array<string>>([])
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [offSet, setOffSet] = useState<number>(0);
  const [yFocusedPosition, setYFocusedPosition] = useState<number>(0);
  const [yNextPosition, setYNextPosition] = useState<number>(0);
  const [computedWords, setComputedWords] = useState<Array<string>>([]);
  const [horizontalPosition, setHorizontalPosition] = useState<number>();
  const [letterWidth, setLetterWidth] = useState<number>();
  const [countDown, setCountDown] = useState<number>(60);
  const [startCountDown, setStartCountDown] = useState<boolean>(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.ONE);

  useEffect(() => {
    setFontSize(font_size.MEDIUM);
    setNavigationState(router.asPath.split('/').at(-1));
  }, []);


  useEffect(() => {
    if (userInput && startCountDown === false) {
      setStartCountDown(true);
    }
  }, [userInput]);

  useEffect(() => {
    setWordsStack(shuffleWordsStack(language, gameMode));
  }, [language, gameMode])

  function onSpacePress(e: KeyboardEvent) {
    if (e.code === 'Space') {
      setWordCount(wordCount + 1);
      /* Check if the word typed is correct */
      if (userInput === wordsStack[wordIndex]) {
        setComputedWords([...computedWords, wordsStack[wordIndex]])
        setScore(score + 1);
      }
      /* If user reach the end of the word set, end the game */
      if (wordsStack.length === wordCount + 1) {
        setIsTimeOut(true);
      }
      /* If the offset between to span is over 5 px it means that we broke the line and we can move the card upward */
      if (yNextPosition && (yNextPosition - yFocusedPosition) > 5) {
        setOffSet(offSet - ((yNextPosition - yFocusedPosition - 2)));
      }
      setWordIndex(wordIndex + 1);
      setUserInput('');
      e.preventDefault();
    }
  };
  console.log('wordsstack', wordsStack.length, 'wordcount', wordCount);
  
  function onRestart() {
    setWordsStack(shuffleWordsStack(language, gameMode));
    setStartCountDown(false);
    setUserInput('');
    setWordCount(0);
    setScore(0);
    setWordIndex(0);
    setOffSet(0);
    setComputedWords([]);
    setIsTimeOut(false);
    setCountDown(gameMode === GameMode.ONE ? 60 : 0);
  }

  return (
    <div style={{ width: '100%'}}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '80px', color: theme?.secondary, opacity: '0.5' }}>
          {spreadLetters(wordsStack[wordIndex], userInput, setHorizontalPosition, setLetterWidth)}
        </p>
        {horizontalPosition && letterWidth ? <p style={{ transition: 'all 0.2s ease', position: 'absolute', left: horizontalPosition + (letterWidth / 2) - 8.5, display: horizontalPosition ? 'block' : 'none', transform: 'translateY(-25px)' }}><Icon color={theme?.tertiary} icon="symbol-triangle-up" /></p> : ''}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
        <Scoring
          score={score}
          startCountDown={startCountDown}
          setStartCountDown={setStartCountDown}
          setCountDown={setCountDown}
          countDown={countDown}
          wordCount={wordCount}
          theme={theme}
          setIsTimeOut={setIsTimeOut}
          isTimeOut={isTimeOut}
        />
        <Button style={{ marginLeft: '30px', backgroundColor: theme?.tertiary, borderRadius: '25px' }} intent="success" icon="refresh" onClick={onRestart} />
      </div>
      <div className="flex justify-center">
        <WordsDisplayer
          wordsToDisplay={wordsStack}
          userInput={userInput}
          wordIndex={wordIndex}
          offSet={offSet}
          setYFocusedPosition={setYFocusedPosition}
          setYNextPosition={setYNextPosition}
          computedWords={computedWords}
          fontSize={fontSize}
        />
      </div>
      <div className="flex justify-center" style={{ marginTop: '1rem' }}>
        <InputGroup
          style={{ width: '100%' }}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          onKeyDown={onSpacePress}
          asyncControl={true}
          disabled={isTimeOut}
          large={true}
          placeholder="Start typing here..."
        />
      </div>
      <KeyBoard theme={theme} enable={startCountDown && !isTimeOut} />
    </div>
  )
}
export default Main;
