import React, { createRef } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize.hook';
import { EngineProps } from '../../modules/Training/Engine';
import './TypingInput.style.scss';
import { COLORS } from '../../theme/colors';

function TypingInput({
  input, setInput, setTypedWords, setIndexOfProgression, isRunning,
  isUserAllowToType, wordChain, indexOfProgression, isZenModeOn, setMisspellings, inputRef
}: EngineProps & { inputRef: React.RefObject<HTMLInputElement> }) {
  const { isMediumScreen } = useWindowSize();
  const isDisabled = !isRunning && !isUserAllowToType;
  const wordCurrentlyTyping = wordChain[indexOfProgression];
  const isCorrect = wordCurrentlyTyping?.slice(0, input.length) === input;

  return (
    <div className='main-input--wrapper'>
      <input
        style={{ width: isMediumScreen ? '200px' : '', borderBottom: isCorrect ? '' : '2px solid red', color: isCorrect ? '' : COLORS.ERROR }}
        ref={inputRef}
        aria-label='formulaire de saisie principal'
        className="main-input"
        onChange={(event) => setInput(event.target.value.trim())}
        value={input}
        disabled={isDisabled}
        placeholder="Start typing here..."
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          const WHITE_SPACE = ' ';
          /** If zen mode is on, hop to the next word without checking if the current one is correct
          otherwise, check if the current word is correct **/
          const shouldPassWithoutChecking = isZenModeOn || (input === wordChain[indexOfProgression])
        
          // On space bar press
          if (event.key === WHITE_SPACE && shouldPassWithoutChecking && input.length) {
            // Consider skipped letters as misspellings to get a more accurate accuracy rate
            if(wordChain[indexOfProgression].length !== input.length) {
              setMisspellings((prev) => [...prev, ...wordChain[indexOfProgression].split('').splice(input.length, wordChain[indexOfProgression].length - input.length)])
            }
            setTypedWords((prev: string[]) => [...prev, input]);
            setIndexOfProgression((prev: number) => prev + 1);
            setInput('');
            event.preventDefault();
          }
        }}
      />
    </div>
  );
}

export { TypingInput };
