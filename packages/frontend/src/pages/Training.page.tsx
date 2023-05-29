import React from 'react';
import { Engine } from '../modules/Training/Engine/Engine.component';
import { TrainingModule } from '../modules/Training/Training.module';
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
