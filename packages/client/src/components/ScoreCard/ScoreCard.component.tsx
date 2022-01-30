import React from 'react';
import { BsStars } from 'react-icons/bs';
import { IScoreCardProps } from './ScoreCard.props';
import styles from './ScoreCard.module.scss';
import { Colors } from '../../utils/enums';

function borderColor(highlight: boolean | undefined, best: boolean | undefined) {
  if (highlight) {
    return '#FF8C00';
  } if (best) {
    return 'gold';
  }
  return '#34343490';
}

function generateBonusMalusColor(bonus: boolean | undefined, malus: boolean | undefined) {
  if (bonus) {
    return Colors.GREEN;
  } if (malus) {
    return Colors.RED;
  }
  return '#343434';
}

function ScoreCard({
  content, title, highlight, best, unit = '', stat, bonus, malus,
}: IScoreCardProps) {
  return (
    <div
      className={styles.cardWrapper}
      style={{
        boxShadow: stat ? 'none' : '',
        margin: stat ? '1px' : '20px 5px',
        padding: stat ? '3px' : '2rem 0',
        flexBasis: stat ? '30%' : '22%',
        border: `${stat ? 0 : 2}px solid ${borderColor(highlight, best)}`,
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {best && <BsStars style={{ marginRight: '3px' }} color='gold' size={20} />}
        {title.toUpperCase()}
      </span>
      <span style={{ color: generateBonusMalusColor(bonus, malus) }} className={styles.cardContent}>{`${content} ${unit}`}</span>
    </div>
  );
}

export default ScoreCard;
