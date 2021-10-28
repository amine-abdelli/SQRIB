import React from 'react'
import { CountDown } from '../CountDown/CountDown'
import { Score } from '../Score/Score'
import { WordCount } from '../WordAccount/WordCount'

const Scoring = ({ score, startCountDown, countUp, setCountUp, countUpValues, setCountUpValues, setIsCountDownFinished, wordCount }: any) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%'}}>
      <Score score={score} />
      <CountDown
        startCountDown={startCountDown}
        countUp={countUp}
        setCountUp={setCountUp}
        countUpValues={countUpValues}
        setCountUpValues={setCountUpValues}
        setIsCountDownFinished={setIsCountDownFinished}
      />
      <WordCount
        wordCount={wordCount} 
      />
    </div>
  )
}

export { Scoring };
