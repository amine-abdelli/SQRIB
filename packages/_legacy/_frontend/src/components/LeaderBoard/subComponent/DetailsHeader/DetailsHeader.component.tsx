import {
  formatDate, Game, topValue,
} from '@sqrib/utils';
import React from 'react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import Spacer from '../../../../UI/Spacer/Spacer.component';
import { DetailsHeaderProps } from './DetailsHeader.props';

function DetailsHeader({
  scores, lastActivity, type, games, details,
}: DetailsHeaderProps) {
  const formatedDate = new Date(lastActivity);
  const { isSmallScreen, isLargeScreen, isMediumScreen } = useWindowSize();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      {type === Game.MULTI && games && details && (
      <>
        <p style={{ fontWeight: 600, margin: 0, textAlign: 'center' }}>
          Victoires :
          {isLargeScreen && <br />}
          {' '}
          <span style={{ fontWeight: 800 }}>
            {' '}
            {games.filter(({ winner }: any) => winner === details.nickname).length}
          </span>
        </p>
        <Spacer w="10" />
      </>
      )}
      {(type === Game.MULTI && isMediumScreen) ? (
        <>
        </>
      ) : (
        <p style={{ fontWeight: 600, margin: 0, textAlign: 'center' }}>
          Parties jouées :
          {isLargeScreen && <br />}
          {' '}
          <span style={{ fontWeight: 800 }}>{scores?.length || 0}</span>
        </p>
      )}
      <Spacer w="10" />
      <p style={{ fontWeight: 600, margin: 0, textAlign: 'center' }}>
        Meilleur mpm :
        {isLargeScreen && <br />}
        {' '}
        <span style={{ fontWeight: 800 }}>{topValue(scores, 'mpm')}</span>
      </p>
      <Spacer w="10" />
      <p style={{ fontWeight: 600, margin: 0, textAlign: 'center' }}>
        {isSmallScreen ? 'Dern. activité :' : 'Dernière activité :'}
        {isLargeScreen && <br />}
        {' '}
        <span style={{ fontWeight: 800 }}>{formatDate(formatedDate, (type === Game.MULTI || isSmallScreen) ? 'short' : '')}</span>
      </p>
    </div>
  );
}

export default DetailsHeader;
