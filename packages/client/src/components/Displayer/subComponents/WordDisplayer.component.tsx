import { Text } from '@nextui-org/react';
import React from 'react';
import styles from '../Displayer.module.scss';
import { IWordDisplayer } from './WordDisplayer.props';

function WordDisplayer({
  setState = () => null, word, className, wordKey, style, fontSize,
}: IWordDisplayer) {
  return (
    <div
      className={styles.overlay}
      ref={(element: HTMLDivElement | null) => setState(element?.getBoundingClientRect().y)}
    >
      <div
        className={className}
        key={wordKey}
        style={{
          display: 'inline', margin: 0, padding: 0,
        }}
      >
        <Text style={{ ...style, display: 'inline' }} size={fontSize}>
          {word}
        </Text>
      </div>
    </div>
  );
}

export default WordDisplayer;
