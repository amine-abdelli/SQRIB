import React from 'react'
import { PlayerCard } from '../PlayerCard/PlayerCard.component'
import { Player } from '@sqrib/shared'
import './PlayerCardList.style.scss'

interface PlayerCardListProps {
  players: Player[];
  totalWords?: number;
  currentUsername?: string;
}

const PlayerCardList = ({ players, totalWords, currentUsername }: PlayerCardListProps) => {
  return (
    <div className='player-card-list'>
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          totalWords={totalWords}
          currentUsername={currentUsername}
        />
      ))}
    </div>
  )
}

export { PlayerCardList }
