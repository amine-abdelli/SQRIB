import React from 'react'
import { Card } from '../../../../../components/Card/Card.component';
import './WeeklyTracker.style.scss';
import { Activity } from './subComponents';
import { useGetUserWeeklyTracker } from '../../../../../api/queries/useGetWeeklyTracker.hooks';

const WeeklyTracker = () => {
  const { data: response } = useGetUserWeeklyTracker();
  const { data } = response || { data: null };
  console.log('data : ', data)
  return (
    <Card className='weekly-tracker--wrapper'>
      <div className='weekly-tracker--activity'>
        <Activity hasPlayed />
        <Activity />
        <Activity />
        <Activity hasPlayed />
        <Activity today />
        <Activity toCome />
        <Activity toCome />
      </div>
    </Card>
  )
}

export { WeeklyTracker };