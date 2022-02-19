/* eslint-disable max-len */
import { Card } from '@nextui-org/react';
import { useRouter } from 'next/dist/client/router';
import React, {
  ReactElement, useContext,
} from 'react';
import { MainContext } from '../../context/MainContext';
import { splitStringToSpans } from '../../utils/displayer.utils';
import { Routes } from '../../utils/enums';
import { setComputedWordsColor } from '../../utils/words.utils';
import Overlay from '../Overlay/Overlay.component';
import styles from './Displayer.module.scss';
import WordDisplayer from './subComponents/WordDisplayer.component';

function Displayer(
  { wordsStack }: { wordsStack: string[] },
) {
  const isDidacticiel = useRouter().pathname === Routes.DIDACTICIEL;
  const {
    userInput, wordIndex, fontSize,
    offSet, setYFocusedPosition,
    setYNextPosition, startTimer, countDown, gameMode, computedWords, correctWords,
  } = useContext(MainContext);

  const overlayProps = {
    gameMode, countDown, startTimer, computedWords,
  };
  const displayedWords = wordsStack?.map((word: string, i: number): ReactElement => {
    // const isWordPassed = wordIndex && computedWords && wordsStack && i && (i < wordIndex);
    // console.log('wordIndex', wordIndex);
    // console.log('yNext', yNextPosition);
    // console.log('yFocused', yFocusedPosition);
    if (i === wordIndex) {
      return (
        <WordDisplayer
          className={styles.wordFocus}
          // style={{ color: Colors.GREY }}
          key={`${word + i}`}
          setState={setYFocusedPosition}
          word={splitStringToSpans(word, userInput)}
          fontSize={fontSize}
        />
      );
    }
    if (i === wordIndex + 1) {
      return (
        <WordDisplayer
          key={`${word + i}`}
          // style={{ margin: 0, color: Colors.GREY }}
          setState={setYNextPosition}
          word={` ${word} `}
          fontSize={fontSize}
        />
      );
    }
    // if (i < wordIndex - 1) { // ! Works aswell but not totally
    if (i < wordIndex) {
      return (
        <WordDisplayer
          style={{
            // color: Colors.GREY,
            margin: 0,
            // textDecoration: isWordPassed && (wordsStack[i] !== computedWords[i]) ? 'underline red' : '',
          }}
          key={`${word + i}`}
          // ! Probleme comes from here :(
          // word={splitStringToSpans(wordsStack[i], computedWords[i])}
          // ! Words but not what we want
          word={` ${word} `}
          fontSize={fontSize}
        />
      );
    }
    return (
      <WordDisplayer
        // style={{ color: Colors.GREY, margin: 0 }}
        key={`${word + i}`}
        word={` ${word} `}
        style={{ color: setComputedWordsColor(word, i, wordIndex, correctWords), margin: 0 }}
        fontSize={fontSize}
      />
    );
  });
  const isOverlayTriggered = !isDidacticiel ? !startTimer : false;
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Card>
        <div className={styles.displayer}>
          <div className={styles.borderTop} />
          <div style={{ transform: `translate(0, ${offSet}px`, fontSize }}>
            {displayedWords}
          </div>
          {isOverlayTriggered && (
          <Overlay {...overlayProps} />
          )}
        </div>
      </Card>
    </div>
  );
}

export { Displayer };
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// import { useRouter } from 'next/dist/client/router';
// import React, {
//   ReactElement, useContext,
// } from 'react';
// import { MainContext } from '../../context/MainContext';
// import { splitStringToSpans } from '../../utils/displayer.utils';
// import Overlay from '../Overlay/Overlay.component';
// import styles from './Displayer.module.scss';
// import WordDisplayer from './subComponents/WordDisplayer.component';

// function Displayer(
//   { wordsStack, focusedLetter }: { wordsStack: string[], focusedLetter?: string },
// ) {
//   const isDidacticiel = useRouter().pathname === '/didacticiel';
//   const {
//     userInput, wordIndex, fontSize,
//     offSet, setYFocusedPosition,
//     setYNextPosition, startTimer, countDown, gameMode, computedWords,
//   } = useContext(MainContext);

//   const overlayProps = {
//     gameMode, countDown, startTimer, computedWords,
//   };

//   const displayedWords = wordsStack?.map((word: string, i: number): ReactElement => {
//     if (i === wordIndex) {
//       return (
//         <WordDisplayer
//           className={styles.wordFocus}
//           setState={setYFocusedPosition}
//           word={splitStringToSpans(word, userInput)}
//         />
//       );
//     }
//     if (i === wordIndex + 1) {
//       return (
//         <WordDisplayer style={{ margin: 0 }} setState={setYNextPosition} word={` ${word} `} />
//       );
//     }
//     return (
//       <WordDisplayer
//         key={`${word + i}`}
//         word={` ${word} `}
//         style={{ margin: 0 }}
//       />
//     );
//   });
//   const isOverlayTriggered = !isDidacticiel ? !startTimer : false;
//   return (
//     <div className={styles.displayer}>
//       <div className={styles.borderTop} />
//       <div style={{ transform: `translate(0, ${offSet}px`, fontSize }} className="content">
//         {displayedWords}
//       </div>
//       {isOverlayTriggered && (
//         <Overlay {...overlayProps} />
//       )}
//     </div>
//   );
// }

// Displayer.defaultProps = {
//   focusedLetter: undefined,
// };

// export { Displayer };
