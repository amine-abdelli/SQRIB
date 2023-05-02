import React from 'react';
import { Word } from './SubComponent';
import { EngineProps } from '../Engine';
import './WordsCollection.style.scss';

function WordsCollection({
  wordChain, indexOfProgression, typedWords, input, fontSize,
}: EngineProps) {
  return (
    <div className='words-collection--wrapper' >
      {wordChain.map((aWord, index) => {
        const isFocused = indexOfProgression === index;
        return (<>
          <Word
            isFocused={isFocused}
            comparison={typedWords[index]}
            word={aWord}
            indexOfProgression={indexOfProgression}
            currentIndex={index}
            input={input}
            fontSize={fontSize}
            />
          <span style={{ fontSize }}>{' '}</span>
        </>
        );
      })}
    </div>
  );
}

export { WordsCollection };
