import React, { useState, useEffect, useRef } from 'react';
import { Word } from './SubComponent';
import { Overlay } from '../Overlay/Overlay.component';
import { IWordsCollectionProps } from './WordsCollection.props';
import './WordsCollection.style.scss';

function WordsCollection({
  wordChain, indexOfProgression, typedWords, input, fontSize, isRunning, isUserAllowToType, setVerticalOffSet, verticalOffSet, mode, setMisspellings, horizontal
}: IWordsCollectionProps & { horizontal?: boolean }) {
  const [currentWordSpanPosition, setCurrentWordSpanPosition] = useState(0);
  const [nextWordSpanPosition, setNextWordSpanPosition] = useState(0);
  const [horizontalOffset, setHorizontalOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (horizontal) {
      // Read the DOM directly so we always get the actual current position
      const container = containerRef.current;
      if (!container) return;
      const focusedEl = container.querySelector('.word--focused') as HTMLElement | null;
      if (!focusedEl) return;
      const containerRect = container.getBoundingClientRect();
      const focusedRect = focusedEl.getBoundingClientRect();
      // How far the focused word's left edge is from the container's left edge
      const relativeX = focusedRect.left - containerRect.left;
      // Target: keep the focused word 15% from the left (inside the fade-in zone)
      const targetX = containerRect.width * 0.15;
      const shift = relativeX - targetX;
      if (shift > 0) {
        setHorizontalOffset((prev) => prev + shift);
      }
    } else {
      setVerticalOffSet(verticalOffSet - (nextWordSpanPosition - currentWordSpanPosition));
    }
  }, [indexOfProgression]);

  const translate = horizontal
    ? `${-horizontalOffset}px 0`
    : `0 ${verticalOffSet}px`;

  return (
    <div
      ref={horizontal ? containerRef : undefined}
      className={`words-collection--wrapper ${horizontal ? 'words-collection--wrapper--horizontal' : ''}`}
    >
      <div style={{ translate }}>
        {wordChain.map((aWord, index) => (
          <React.Fragment key={index}>
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
              horizontal={horizontal}
            />
            <span style={{ fontSize }}>{' '}</span>
          </React.Fragment>
        ))}
      </div>
      <Overlay isVisible={!isRunning} isUserAllowToType={isUserAllowToType} mode={mode} />
    </div>
  );
}

export { WordsCollection };
