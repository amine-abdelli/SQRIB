import React from 'react';
import styles from '../Displayer.module.scss';
import { IWordDisplayer } from './WordDisplayer.props';

function WordDisplayer({
  setState = () => null, word, className, key, style,
}: IWordDisplayer) {
  return (
    <div className={styles.overlay}>
      <span
        className={className}
        key={key}
        style={style}
        ref={(element: HTMLSpanElement | null) => setState(element?.getBoundingClientRect().y)}
      >
        {word}
      </span>
    </div>
  );
}

export default WordDisplayer;
