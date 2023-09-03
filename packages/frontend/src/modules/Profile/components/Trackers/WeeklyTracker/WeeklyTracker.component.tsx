import React from 'react'
import { Card } from '../../../../../components/Card/Card.component';
import './WeeklyTracker.style.scss';
import { Activity } from './subComponents';
import { useGetUserWeeklyTracker } from '../../../../../api/queries/useGetWeeklyTracker.hooks';
import { weeklyDays } from './constants';

const WeeklyTracker = () => {
  const { data: response } = useGetUserWeeklyTracker();
  const { data } = response || { data: null };
  console.log('data : ', data)
  return (
    <Card className='weekly-tracker--wrapper'>
      <div className='weekly-tracker--activity'>
        {weeklyDays.map(d => <Activity today label={d.charAt(0)} />)}
      </div>
    </Card>
  )
}

export { WeeklyTracker };