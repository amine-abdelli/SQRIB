import React from 'react';
import { Word } from './SubComponent';
import { EngineProps } from '../../modules/Training/Engine';
import './WordsCollection.style.scss';
import { Overlay } from '../Overlay/Overlay.component';

function WordsCollection({
  wordChain, indexOfProgression, typedWords, input, fontSize, isRunning, isUserAllowToType
}: EngineProps) {
  return (
    <div className='words-collection--wrapper' >
      {wordChain.map((aWord, index) => (<>
          <Word
            isFocused={indexOfProgression === index}
            comparison={typedWords[index]}
            word={aWord}
            indexOfProgression={indexOfProgression}
            currentIndex={index}
            input={input}
            fontSize={fontSize}
            />
          <span style={{ fontSize }}>{' '}</span>
        </>
      ))}
      <Overlay isVisible={!isRunning} isUserAllowToType={isUserAllowToType} />
    </div>
  );
}

export { WordsCollection };
