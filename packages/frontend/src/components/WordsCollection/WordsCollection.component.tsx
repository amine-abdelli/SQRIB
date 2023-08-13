import React, { useState, useEffect } from 'react';
import { Word } from './SubComponent';
import { EngineProps } from '../../modules/Training/Engine';
import './WordsCollection.style.scss';
import { Overlay } from '../Overlay/Overlay.component';
import { IWordsCollectionProps } from './WordsCollection.props';

function WordsCollection({
  wordChain, indexOfProgression, typedWords, input, fontSize, isRunning, isUserAllowToType, setVerticalOffSet, verticalOffSet, mode, setMisspellings
}: IWordsCollectionProps) {
  const [currentWordSpanPosition, setCurrentWordSpanPosition] = useState(0);
  const [nextWordSpanPosition, setNextWordSpanPosition] = useState(0);

  useEffect(() => {
    setVerticalOffSet(verticalOffSet - ((nextWordSpanPosition - currentWordSpanPosition)));
  }, [indexOfProgression])

  return (
    <div className='words-collection--wrapper' >
      <div style={{ translate: `0 ${verticalOffSet}px` }}>
        {wordChain.map((aWord, index) => (<>
          <Word
            isFocused={indexOfProgression === index}
            comparison={typedWords[index]}
            word={aWord}
            indexOfProgression={indexOfProgression}
            currentIndex={index}
            input={input}
            fontSize={fontSize}
            setNextWordSpanPosition={setNextWordSpanPosition}
            setCurrentWordSpanPosition={setCurrentWordSpanPosition}
            setMisspellings={setMisspellings}
            isRunning={isRunning}
          />
          <span style={{ fontSize }}>{' '}</span>
        </>
        ))}
      </div>
      <Overlay isVisible={!isRunning} isUserAllowToType={isUserAllowToType} mode={mode} />
    </div>
  );
}

export { WordsCollection };
