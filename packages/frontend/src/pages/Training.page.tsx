import React from 'react';
import { Engine } from '../components/Engine/Engine.component';
import { TrainingContainer } from '../containers/TrainingContainer.container';
import '../theme/pages/_Training.scss';

function Training() {
  console.log('timer');

  return (
    <main className='layout--main training-page'>
      <h1>Training</h1>
      <Engine>
        <TrainingContainer />
      </Engine>
    </main>
  );
}

export default Training;
