import React, { createRef } from 'react';
import './TypingInput.style.scss';
import { useWindowSize } from '../../hooks/useWindowSize.hook';
import { EngineProps } from '../Engine';

function onSpacePress(
  event: KeyboardEvent<HTMLInputElement>,
  input: EngineProps['input'],
  setTypedWords: EngineProps['setTypedWords'],
  setInput: EngineProps['setInput'],
  setIndexOfProgression: EngineProps['setIndexOfProgression'],
) {
  if (event.key === ' ') {
    setTypedWords((prev: string[]) => [...prev, input]);
    setIndexOfProgression((prev: number) => prev + 1);
    setInput('');
    event.preventDefault();
  }
}

function TypingInput({
  input, setInput, setTypedWords, setIndexOfProgression,
}: EngineProps) {
  const { isMediumScreen } = useWindowSize();
  const mainInputRef = createRef<HTMLInputElement>();
  return (
    <div
      className="main-input--wrapper"
    >
      <input
        style={{
          width: isMediumScreen ? '200px' : '',
        }}
        ref={mainInputRef}
        aria-label='formulaire de saisie principal'
        className="main-input"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onKeyDown={(
          event: KeyboardEvent<HTMLInputElement>,
        ) => onSpacePress(event, input, setTypedWords, setInput, setIndexOfProgression)}
        disabled={false}
        placeholder="Start typing here..."
      />
    </div>
  );
}

export { TypingInput };
