import React from 'react';
import { TrainingEngine } from '../modules/Training/Engine/TrainingEngine.component';
import { TrainingModule } from '../modules/Training/Training.module';
import { EngineProps } from '../components';

function Training() {
  return (
    <main className='layout--main'>
      <TrainingEngine>
        <TrainingModule {...{} as EngineProps} />
      </TrainingEngine>
    </main>
  );
}

export default Training;
