import React from 'react';
import { MovingBackground } from '../components/MovingBackground/MovingBackground.component';
import { Logo, Spacer, SpacerSize } from '../components';
import '../theme/pages/_NotFound.scss';
import { Text } from '../components/Text/Text.component';
import { COLORS } from '../theme/colors';

function NotFound() {
  return (
    <main className='layout--main not-found--wrapper'>
      <MovingBackground />
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Logo label='4' size={200} />
        <Logo label='0' size={200} />
        <Logo label='4' size={200} />
      </div>
      <Spacer x size={SpacerSize.LARGE} />
      <Text h1 centered bold fira color={COLORS.LIGHT_GREEN_FULL} size={32}>Oops, looks like you mistyped the URL. Guess it's practice time!</Text>
    </main>
  );
}

export default NotFound;
