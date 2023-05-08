/* eslint-disable max-len */
import React from 'react';
import { WordProps } from './Word.props';
import { getFocusedWordLetterColor, getLetterColor, getTextDecorationColor } from '../../../utils/typing.utils';
import './Word.style.scss';

function Word({
  word, isFocused, comparison, indexOfProgression, currentIndex, input, fontSize,
}: WordProps) {
  const wordsFontSize = {
    fontSize: `${fontSize}px`,
  };

  const wordFromDictionnay = word?.split('');
  const wordTypedByUser = comparison?.split('');
  const wordUserIsCurrentlyTyping = input?.split('');

  return (
    isFocused
      ? (
        <span style={{ ...wordsFontSize }} className='word word--focused'>
          {wordFromDictionnay?.map((aLetter: string, i: number) => <span style={{ color: getFocusedWordLetterColor(aLetter, wordUserIsCurrentlyTyping?.[i], i, wordUserIsCurrentlyTyping.length), scale: i === (input.length ? input.length - 1 : input.length) ? '1.1' : '' }}>{aLetter}</span>)}
        </span>
      ) : (
      <span className='word' style={{ textDecoration: getTextDecorationColor(word, comparison, indexOfProgression, currentIndex), ...wordsFontSize }}>
        {wordFromDictionnay?.map((aLetter: string, i: number) => (<span style={{ color: getLetterColor(aLetter, wordTypedByUser?.[i], indexOfProgression, currentIndex, isFocused) }}>{aLetter}</span>))}
      </span>
      )
  );
}

export { Word };
