import React from 'react';
import { Card } from '../../../../components/Card/Card.component';
import { UserStatItem } from './subComponents';
import { useGetUserStats } from '../../../../api/queries/useGetUserStats.hooks';
import { Text } from '../../../../components/Text/Text.component';

const UserStats = () => {
  const { data } = useGetUserStats();
  // console.log('data : ', data.data.session_count)
  // Jours d'activité
  // Nombre de parties
  // Points gagnés
  // Precision moyenne
  // Temps de jeu
  // Nombre de parties jouées
  // Meilleur wpm
  // Nombre de mots saisies
  // Wpm moyen
  return (
    <Card>
      <Text h1>{data?.data?.session_count}</Text>
      <UserStatItem />
    </Card>
  )
}

export { UserStats };