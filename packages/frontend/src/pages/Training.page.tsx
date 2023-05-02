import React from 'react';
import { Engine } from '../components/Engine/Engine.component';
import { TrainingModule } from '../modules/TrainingContainer.module';
import '../theme/pages/_Training.scss';

function Training() {
  return (
    <main className='layout--main'>
      <Engine>
        <TrainingModule />
      </Engine>
    </main>
  );
}

export default Training;
