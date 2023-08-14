/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { WordProps } from './Word.props';
import { getFocusedWordLetterColor, getLetterColor, getTextDecorationColor } from '../../../utils/typing.utils';
import './Word.style.scss';

function Word({
  word, isFocused, comparison, indexOfProgression, currentIndex, input, fontSize, setCurrentWordSpanPosition, setNextWordSpanPosition, setMisspellings
}: WordProps) {
  const [prevLength, setPrevLength] = React.useState<number>(0);
  const wordsFontSize = { fontSize: `${fontSize}px` };
  const wordFromDictionnay = word?.split('');
  const wordTypedByUser = comparison?.split('');
  const wordUserIsCurrentlyTyping = input?.split('');

  useEffect(() => {
    const typingIndex = wordUserIsCurrentlyTyping?.length - 1;
    // Prevent adding extra misspellings when deleting a letter
    // e.g: hell -> hellp -> hell -> hello. Deleting the p should not add a misspelling
    const isTypingForward = prevLength < typingIndex;
    if (isFocused && wordUserIsCurrentlyTyping?.[typingIndex] !== wordFromDictionnay?.[typingIndex] && wordUserIsCurrentlyTyping?.[typingIndex]?.length <= wordFromDictionnay?.[typingIndex]?.length && isTypingForward) {
      setMisspellings((prev) => [...prev, wordFromDictionnay?.[typingIndex]]);
    };
    setPrevLength(typingIndex ?? 0)
  }, [input])

  return (
    isFocused
      ? (
        <span
          className='word--focused'
          ref={(e) => setCurrentWordSpanPosition(e?.getBoundingClientRect()?.y ?? 0)}
          style={wordsFontSize}
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

