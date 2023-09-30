import React from 'react'
import { useParams } from 'react-router-dom';
import { memberSinceDate } from '@sqrib/shared';

import { Card } from '../../../../components/Card/Card.component';
import { Text } from '../../../../components/Text/Text.component';
import { Spacer, SpacerSize } from '../../../../components';
import { Avatar } from '../../../../components/Avatar/Avatar.component';
import { COLORS } from '../../../../theme/colors';
import { capitalizeFirstLetter } from '../../../../utils';
import { useGetUser } from '../../../../api/queries';
import { useWindowSize } from '../../../../hooks';

import './PlayerDetail.style.scss';

const PlayerDetail = () => {
  const { username: profileUsername } = useParams();
  const { data, refetch } = useGetUser({ username: profileUsername });
  const user = data?.data;

  React.useEffect(() => {
    refetch();
  }, [location, profileUsername]);

  const username = user?.username;
  const description = user?.description;
  const created_at = user?.created_at;
  const avatar = user?.avatar;

  const { isSmallScreen } = useWindowSize();

  return (
    <Card className='player-detail--wrapper'>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Text bold fira h1 className='player-detail--username'>{capitalizeFirstLetter(username ?? '')}</Text>
          <Spacer size={SpacerSize.SMALL} y />
          {description ? <Text className='user-bio' p>{description}</Text> : <Text p thin italic color={COLORS.GREY}>No bio</Text>}
          <Spacer size={SpacerSize.SMALL} y />
        </div>
        <div>
          {created_at && <Text className='since-date' thin italic>{memberSinceDate(created_at)}</Text>}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar username={username ?? ''} avatarUrl={avatar} size={isSmallScreen ? 'xlarge' : 'xxlarge'} color={user?.color} />
      </div>
    </Card>
  )
}

export { PlayerDetail };