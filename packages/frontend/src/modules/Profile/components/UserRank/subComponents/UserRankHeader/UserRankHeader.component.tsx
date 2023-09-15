import React from 'react'
import { Text } from '../../../../../../components/Text/Text.component'
import { COLORS } from '../../../../../../theme/colors'

const UserRankHeader = () => {
  const headerTitles = ['Rank', 'Username', 'Best wpm', 'Av. accuracy'];
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 0.8rem 0 0', padding: '0.2rem 1rem', background: COLORS.LIGHT_GREEN, borderRadius: '5px', border: '3px solid black', boxShadow: '4px 4px 0 black' }}>
      {headerTitles.map((title, index) => (
        <Text p fira bold size={14} style={{ flex: 1 }} key={index}>{title}</Text>
      ))}
    </div>
  )
}

export { UserRankHeader }