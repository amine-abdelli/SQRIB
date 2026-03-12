import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@sqrib/shared';
import ProgressBar from '@ramonak/react-progress-bar';
import { BsTrophyFill } from 'react-icons/bs';

import { Text } from '../../../../components/Text/Text.component';
import { Button } from '../../../../components/Button/Button.component';
import { Avatar } from '../../../../components/Avatar/Avatar.component';
import { Spacer, SpacerSize } from '../../../../components';
import { MAIN_ROUTES } from '../../../../routes/paths';
import { upperFirst } from '../../../../utils';
import { COLORS } from '../../../../theme/colors';
import './GameResults.style.scss';

interface GameResultsProps {
  rankings: Player[];
  totalWords: number;
  timer: number;
}

const TROPHY_COLORS = [COLORS.GOLD, '#C0C0C0', '#CD7F32'];
const RANK_LABELS = ['1st', '2nd', '3rd'];

const GameResults = ({ rankings, totalWords, timer }: GameResultsProps) => {
  const navigate = useNavigate();

  return (
    <div className='game-results'>
      <div className='game-results__card'>
        <Text h1 fira bold centered>Race complete!</Text>
        <Spacer y size={SpacerSize.SMALL} />
        <Text fira centered style={{ color: COLORS.GREY }}>
          {timer}s elapsed · {rankings.length} player{rankings.length !== 1 ? 's' : ''}
        </Text>

        <Spacer y size={SpacerSize.MEDIUM} />

        <div className='game-results__list'>
          {rankings.map((player, index) => {
            const pct = totalWords > 0
              ? Math.min(Math.round((player.indexOfProgression / totalWords) * 100), 100)
              : 0;
            const isWinner = index === 0;

            return (
              <div
                key={player.id}
                className={`game-results__player ${isWinner ? 'game-results__player--winner' : ''}`}
              >
                <div className='game-results__rank'>
                  {index < 3
                    ? <BsTrophyFill size={22} color={TROPHY_COLORS[index]} />
                    : <Text fira bold style={{ color: COLORS.GREY }}>#{index + 1}</Text>}
                </div>

                <Avatar username={player.username} avatarUrl={player.avatar} color={player.color} size='medium' />

                <div className='game-results__info'>
                  <div className='game-results__name-row'>
                    <Text fira bold>{upperFirst(player.username)}</Text>
                    {index < 3 && (
                      <span className='game-results__badge' style={{ background: TROPHY_COLORS[index] }}>
                        {RANK_LABELS[index]}
                      </span>
                    )}
                  </div>
                  <div className='game-results__stats'>
                    <span>{player.mpm} <small>WPM</small></span>
                    <span>{player.precision}<small>% acc</small></span>
                    <span>{player.indexOfProgression}<small>/{totalWords} words</small></span>
                  </div>
                  <ProgressBar
                    width='100%'
                    completed={pct}
                    customLabel={`${pct}%`}
                    labelAlignment='center'
                    bgColor={player.color}
                    height='14px'
                    borderRadius='4px'
                  />
                </div>
              </div>
            );
          })}
        </div>

        <Spacer y size={SpacerSize.MEDIUM} />
        <Button stretch onClick={() => navigate(MAIN_ROUTES.MULTIPLAYER_SELECTION)}>
          Back to rooms
        </Button>
      </div>
    </div>
  );
};

export { GameResults };
