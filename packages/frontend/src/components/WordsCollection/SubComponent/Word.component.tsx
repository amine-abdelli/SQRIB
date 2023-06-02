/* eslint-disable max-len */
import React from 'react';
import { WordProps } from './Word.props';
import { getFocusedWordLetterColor, getLetterColor, getTextDecorationColor } from '../../../utils/typing.utils';
import './Word.style.scss';

function Word({
  word, isFocused, comparison, indexOfProgression, currentIndex, input, fontSize, setCurrentWordSpanPosition, setNextWordSpanPosition
}: WordProps) {
  const wordsFontSize = { fontSize: `${fontSize}px` };
  const wordFromDictionnay = word?.split('');
  const wordTypedByUser = comparison?.split('');
  const wordUserIsCurrentlyTyping = input?.split('');
  return (
    isFocused
      ? (
        <span
          ref={(e) => setCurrentWordSpanPosition(e?.getBoundingClientRect()?.y ?? 0)}
          style={{ ...wordsFontSize, background: 'rgb(19, 164, 82, 0.1)' }}
        >
          {wordFromDictionnay?.map((aLetter: string, i: number) => <span style={{ color: getFocusedWordLetterColor(aLetter, wordUserIsCurrentlyTyping?.[i], i, wordUserIsCurrentlyTyping.length) }}>{aLetter}</span>)}
        </span >
      ) : (
        <span style={{ textDecoration: getTextDecorationColor(word, comparison, indexOfProgression, currentIndex), ...wordsFontSize }} ref={(e) => currentIndex === indexOfProgression + 1 ? setNextWordSpanPosition(e?.getBoundingClientRect().y ?? 0) : null}>
          {wordFromDictionnay?.map((aLetter: string, i: number) => (<span style={{ color: getLetterColor(aLetter, wordTypedByUser?.[i], indexOfProgression, currentIndex, isFocused) }}>{aLetter}</span>))}
        </span>
      )
  );
}

export { Word };
