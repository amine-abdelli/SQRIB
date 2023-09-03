import React from 'react'
import { parallax } from '../../utils';
import { randomIntFromInterval } from '@sqrib/shared';
import { SvgLetters } from '../../assets/images/letters';
import './MovingBackground.style.scss';

const MovingBackground = () => {
  document.addEventListener("mousemove", parallax);
  const alphabets = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

  return (
    <>
      {SvgLetters.map((image, index) =>
        <img className={`letters letters--${alphabets[index]}`}
          style={{ transform: `rotate(${index % 2 === 0 ? 12 : -12}deg)` }}
          key={index}
          src={image}
          data-speed={randomIntFromInterval(-3, 3)}
        />)}
    </>
  )
}

export { MovingBackground }