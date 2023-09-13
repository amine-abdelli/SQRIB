import React from 'react'
import { Card } from '../../../../components/Card/Card.component';
import { Text } from '../../../../components/Text/Text.component';
import { Spacer, SpacerSize } from '../../../../components';
import Avatar from '../../../../components/Avatar/Avatar.component';
import { memberSinceDate } from '@sqrib/shared';
import { COLORS } from '../../../../theme/colors';
import { capitalizeFirstLetter } from '../../../../utils';
import { useGetSelf } from '../../../../api/queries';
import { useMatch, useParams } from 'react-router-dom';
import './PlayerDetail.style.scss';

const PlayerDetail = ({ username: hihi }: PlayerDetailProps) => {
  const { username: profileUsername } = useParams();
  const { user, refetch } = useGetSelf({ username: profileUsername });

  React.useEffect(() => {
    refetch();
  }, [location, profileUsername]);

  const username = user?.username;
  const description = user?.description;
  const created_at = user?.created_at;
  const avatar = user?.avatar;

  return (
    <Card className='player-detail--wrapper'>
      <div>
        <Text bold fira h1>{capitalizeFirstLetter(username ?? '')}</Text>
        <Spacer size={SpacerSize.SMALL} y />
        {description ? <Text p>{description}</Text> : <Text p thin italic color={COLORS.GREY}>No bio</Text>}
        <Spacer size={SpacerSize.SMALL} y />
        {created_at && <Text thin italic>{memberSinceDate(created_at)}</Text>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar username={username ?? ''} avatarUrl={avatar} size={'xlarge'} color={user?.color} />
      </div>
    </Card>
  )
}

export { PlayerDetail };