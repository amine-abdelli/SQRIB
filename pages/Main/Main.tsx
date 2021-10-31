import React, { FormEvent, KeyboardEvent, KeyboardEventHandler, useEffect, useState } from 'react';
import { shuffleWordsStack } from '../helpers/WordDisplayer.helper';

import { Button, InputGroup } from '@blueprintjs/core';
import { ICountUpValues } from '../../components/CountDown/CountDown.interfaces';
import { Scoring } from '../../components/Scoring/Scoring';
import { WordsDisplayer } from '../../components/WordsDisplayer/WordsDisplayer';

function Main() {
  const [wordsStack, setWordsStack] = useState<Array<string>>([])
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [isCountDownFinished, setIsCountDownFinished] = useState(false);
  const [startCountDown, setStartCountDown] = useState<boolean>(false);
  const [countUp, setCountUp] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [offSet, setOffSet] = useState<number>(0);
  const [yFocusedPosition, setYFocusedPosition] = useState<number>(0);
  const [yNextPosition, setYNextPosition] = useState<number>(0);
  const [computedWords, setComputedWords] = useState<Array<string>>([]);
  const [countUpValues, setCountUpValues] = useState<ICountUpValues>({
    minutes: 1,
    seconds: 0
  });

  useEffect(() => {
    if (userInput && startCountDown === false) {
      setStartCountDown(true);
    }
  }, [userInput]);

  useEffect(() => {
    setWordsStack(shuffleWordsStack());
  }, [])

  function onSpacePress(e: KeyboardEvent) {
    if (e.code === 'Space') {
      setWordCount(wordCount + 1);
      if (userInput === wordsStack[wordIndex]) {
        setComputedWords([...computedWords, wordsStack[wordIndex]])
        setScore(score + 1);
      }
      if (yNextPosition && (yNextPosition - yFocusedPosition) > 5) {
        setOffSet(offSet - ((yNextPosition - yFocusedPosition - 2)));
      }
      setWordIndex(wordIndex + 1);
      setUserInput('');
      e.preventDefault();
    }
  };
  console.log('computed words', computedWords)
  function onRestart() {
    setWordsStack(shuffleWordsStack());
    setIsCountDownFinished(false);
    setStartCountDown(false);
    setUserInput('');
    setWordCount(0);
    setCountUp(0);
    setScore(0);
    setWordIndex(0);
    setOffSet(0);
    setCountUpValues({
      minutes: 1,
      seconds: 0
    })
  }
  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <div style={{ width: '100%' }}>
        <div className="flex justify-between space-around m-4 text-5xl">
          <Scoring
            score={score}
            startCountDown={startCountDown}
            countUp={countUp}
            setCountUp={setCountUp}
            countUpValues={countUpValues}
            setCountUpValues={setCountUpValues}
            setIsCountDownFinished={setIsCountDownFinished} 
            wordCount={wordCount}
          />
          <Button intent="success" icon="refresh" text="restart" onClick={onRestart} />
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
          />
        </div>
        <div className="flex justify-center" style={{ marginTop: '1rem' }}>
          <InputGroup
            style={{ width: '65vw' }}
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            onKeyDown={onSpacePress}
            asyncControl={true}
            disabled={isCountDownFinished ? true : false}
            large={true}
            placeholder="Start typing here..."
          />
        </div>
      </div>
    </div>
  )
}
export { Main };
