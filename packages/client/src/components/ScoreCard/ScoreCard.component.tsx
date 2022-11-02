import React from 'react';
import { BsStars } from 'react-icons/bs';
import { IScoreCardProps } from './ScoreCard.props';
import styles from './ScoreCard.module.scss';

function borderColor(highlight: boolean | undefined, best: boolean | undefined) {
  if (highlight) {
    return '#FF8C00';
  } if (best) {
    return 'gold';
  }
  return '#34343490';
}

function ScoreCard({
  content, title, highlight, best, unit = '', stat,
}: IScoreCardProps) {
  return (
    <div
      className={styles.cardWrapper}
      style={{
        boxShadow: stat ? 'none' : '',
        margin: stat ? '1px' : '20px 5px',
        padding: stat ? '3px' : '2rem 0',
        border: `${stat ? 0 : 2}px solid ${borderColor(highlight, best)}`,
        fontSize: '12px',
        fontWeight: 800,
      }}
    >
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800,
      }}
      >
        {best && <BsStars style={{ marginRight: '3px' }} color='gold' size={20} />}
        {title.toUpperCase()}
      </span>
      <span className={styles.cardContent}>{`${content} ${unit}`}</span>
    </div>
  );
}

export default ScoreCard;
