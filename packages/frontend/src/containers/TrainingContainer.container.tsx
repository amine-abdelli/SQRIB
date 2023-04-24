import React from 'react';
import { WordsCollection } from '../components/WordsCollection/WordsCollection.component';
import { ChildProps } from '../components/Engine/Engine.component';

function TrainingContainer(props: ChildProps) {
  console.log('timer2', props.timer);
  return (
    <div><WordsCollection /></div>
  );
}

export { TrainingContainer };
