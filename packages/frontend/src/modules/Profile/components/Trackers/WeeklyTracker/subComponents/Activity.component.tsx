import React from 'react';
import { ActivityProps } from './Activity.props';
import './Activity.style.scss';

const Activity: React.FC<ActivityProps> = ({ hasPlayed, today, toCome }) => {
  const classes = ['activity--wrapper', today ? 'activity--today' : '', !today ? (hasPlayed ? 'activity--played' : 'activity--missed') : '', toCome ? 'activity--to-come' : ''].join(' ').trim();
  return (
    <div className={classes} />
  )
}

export { Activity };