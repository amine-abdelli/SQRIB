import React from 'react';
import { ActivityProps } from './Activity.props';
import './Activity.style.scss';

const Activity: React.FC<ActivityProps> = ({ hasPlayed, today, toCome, label }) => {
  const classes = ['activity--wrapper', today ? 'activity--today' : '', !today ? (hasPlayed ? 'activity--played' : 'activity--missed') : '', toCome ? 'activity--to-come' : ''].join(' ').trim();
  return (
    <div className={classes}><span>{label}</span></div>
  )
}

export { Activity };