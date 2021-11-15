import React from 'react'

const Stats = ({ points, malus, wordCount, precision }: any) => {
  return (
    <div style={{ padding: '2rem' }} >
      <h1 style={{ fontFamily: 'Indie Flower' }} >
        <h1>42 seconds</h1> 
      </h1>
      <div>
        <p>mots saisies: {points}{" "}</p>
        <p>mots perdus: {malus}{" "}</p>
        <p>nombre de mots:  {wordCount}{" "}</p>
        <p>précision: {precision}%{" "}</p>
      </div>
    </div>
  )
}

export default Stats;
