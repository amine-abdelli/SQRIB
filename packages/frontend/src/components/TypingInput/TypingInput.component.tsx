import React, { createRef } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize.hook';
import { EngineProps } from '../../modules/Training/Engine';
import './TypingInput.style.scss';

function onSpacePress(
  event: React.KeyboardEvent<HTMLInputElement>,
  input: EngineProps['input'],
  setTypedWords: EngineProps['setTypedWords'],
  setInput: EngineProps['setInput'],
  setIndexOfProgression: EngineProps['setIndexOfProgression'],
) {
  const WHITE_SPACE = ' ';
  // On space bar press
  if (event.key === WHITE_SPACE) {
    setTypedWords((prev: string[]) => [...prev, input]);
    setIndexOfProgression((prev: number) => prev + 1);
    setInput('');
    event.preventDefault();
  }
}

function TypingInput({
  input, setInput, setTypedWords, setIndexOfProgression, isRunning,
  isUserAllowToType, wordChain, indexOfProgression,
}: EngineProps) {
  const { isMediumScreen } = useWindowSize();
  const mainInputRef = createRef<HTMLInputElement>();
  const isDisabled = !isRunning && !isUserAllowToType;

  const wordCurrentlyTyping = wordChain[indexOfProgression];
  const isCorrect = wordCurrentlyTyping?.slice(0, input.length) === input;

  return (
    <div className='main-input--wrapper'>
      <input
        style={{ width: isMediumScreen ? '200px' : '', borderBottom: isCorrect ? '' : '2px solid red' }}
        ref={mainInputRef}
        aria-label='formulaire de saisie principal'
        className="main-input"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onKeyDown={(
          event: React.KeyboardEvent<HTMLInputElement>,
        ) => onSpacePress(event, input, setTypedWords, setInput, setIndexOfProgression)}
        disabled={isDisabled}
        placeholder="Start typing here..."
      />
    </div>
  );
}

export { TypingInput };
