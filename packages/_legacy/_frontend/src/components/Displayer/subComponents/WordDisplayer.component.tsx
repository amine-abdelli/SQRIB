import { Text } from '@nextui-org/react';
import React, { useContext, useMemo } from 'react';
import { MainContext } from '../../../context/MainContext';
import styles from '../Displayer.module.scss';
import { IWordDisplayer } from './WordDisplayer.props';

function WordDisplayer({
  setState = () => null, word, className, wordKey, style, fontSize,
}: IWordDisplayer) {
  const currentWord = useMemo(() => word, [word]);
  const { fontSize: textSize } = useContext(MainContext);
  return (
    <div
      key={wordKey}
      className={styles.overlay}
      ref={(element: HTMLDivElement | null) => setState(element?.getBoundingClientRect().y)}
    >
      <div
        className={className}
        style={{
          display: 'inline', margin: 0, padding: 0,
        }}
      >
        <Text style={{ ...style, display: 'inline' }} size={textSize}>
          {currentWord}
        </Text>
      </div>
    </div>
  );
}

export default WordDisplayer;
