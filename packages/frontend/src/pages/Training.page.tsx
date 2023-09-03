import React from 'react';
import { TrainingEngine } from '../modules/Training/Engine/TrainingEngine.component';
import { TrainingModule } from '../modules/Training/Training.module';
import { EngineProps } from '../components';
import '../theme/pages/_Training.scss';

function Training() {
  document.title = 'Training Session';
  return (
    <main className='layout--main training-page'>
      <TrainingEngine>
        <TrainingModule {...{} as EngineProps} />
      </TrainingEngine>
    </main>
  );
}

export default Training;
