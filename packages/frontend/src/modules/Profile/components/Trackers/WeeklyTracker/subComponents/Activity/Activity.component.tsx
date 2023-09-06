import React from 'react';
import { ActivityProps } from './Activity.props';
import './Activity.style.scss';

const Activity: React.FC<ActivityProps> = ({ hasPlayed, today, toCome, label }) => {
  const classes = ['activity--wrapper', hasPlayed ? 'activity--played' : 'activity--missed', toCome ? 'activity--to-come' : '', today ? 'activity--today' : '',].join(' ').trim();
  return (
    <div className={classes}><span>{label}</span></div>
  )
}

export { Activity };