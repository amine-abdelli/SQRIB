import React from 'react'
import { useGetGlobalMetrics } from '../../../api/queries/useGetGlobalMetrics.hooks'
import { Text } from '../../../components/Text/Text.component'
import { COLORS } from '../../../theme/colors'

const HomeHeader = () => {
  const { data } = useGetGlobalMetrics()
  const style = { margin: '1rem 1rem 1rem 0', padding: '0 1rem', borderRadius: '5px', width: '12rem', border: '0px solid black' }
  return (
    <section style={{ display: 'flex' }}>
      <div style={{ ...style, margin: '1rem 1rem 0rem 0rem' }}>
        <Text h1 fira bold color={COLORS.LIGHT_GREEN_FULL} centered>{data?.account_count}</Text>
        <Text h3 fira bold color={COLORS.LIGHT_GREEN_FULL} thin centered size={16}>TOTAL PLAYERS</Text>
      </div>
      <div style={{ ...style, margin: '1rem 0rem' }}>
        <Text h1 fira bold color={COLORS.LIGHT_GREEN_FULL} centered>{data?.game_count}</Text>
        <Text h3 fira bold color={COLORS.LIGHT_GREEN_FULL} thin centered size={16}>GAMES PLAYED</Text>
      </div>
      <div style={{ ...style, margin: '1rem 0rem 0rem 1rem' }}>
        <Text h1 fira bold color={COLORS.LIGHT_GREEN_FULL} centered>{data?.total_time_in_seconds}</Text>
        <Text h3 fira bold color={COLORS.LIGHT_GREEN_FULL} thin centered size={16}>TIME PLAYED</Text>
      </div>
    </section >
  )
}

export { HomeHeader }