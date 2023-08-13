import React from 'react';
import { Text } from '../Text/Text.component';
import './Blockquote.style.scss';

interface BlockquoteProps {
  message: string;
  author?: string;
  size?: number;
}

const Blockquote = ({ message, author, size }: BlockquoteProps) => {
  return (
    <blockquote className='blockquote'>
      <Text p thin size={size ?? 12}>{message}</Text>
      {author ? <cite>- {author}</cite> : ''}
    </blockquote>
  )
}

export { Blockquote }