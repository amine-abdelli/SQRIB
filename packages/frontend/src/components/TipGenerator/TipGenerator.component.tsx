import React from 'react'
import { Blockquote } from '../Blockquote/Blockquote.component'
import tips from './tips.json';
import { pickRandomItem } from '../../utils';

const TipGenerator = () => <Blockquote message={pickRandomItem(tips)}/>

export { TipGenerator }