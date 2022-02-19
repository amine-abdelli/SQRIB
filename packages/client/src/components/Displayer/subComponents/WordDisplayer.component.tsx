import { Text } from '@nextui-org/react';
import React from 'react';
import styles from '../Displayer.module.scss';
import { IWordDisplayer } from './WordDisplayer.props';

function WordDisplayer({
  setState = () => null, word, className, wordKey, style, fontSize,
}: IWordDisplayer) {
  return (
    <div className={styles.overlay}>
      <div
        className={className}
        key={wordKey}
        style={{ ...style, display: 'inline' }}
        ref={(element: any) => setState(element?.getBoundingClientRect().y)}
      >
        <Text style={{ display: 'inline', margin: 0 }} size={fontSize}>{word}</Text>
      </div>
    </div>
  );
}

export default WordDisplayer;
