import React from 'react'
import { Card } from '../../../../components/Card/Card.component';
import { Text } from '../../../../components/Text/Text.component';
import { Spacer, SpacerSize } from '../../../../components';
import Avatar from '../../../../components/Avatar/Avatar.component';
import { ProfileEngineProps } from '../../Engine/ProfileEngine.props';
import { useAuthContext } from '../../../../contexts';
import { UserBase, memberSinceDate } from '@sqrib/shared';
import { COLORS } from '../../../../theme/colors';
import { capitalizeFirstLetter } from '../../../../utils';
import './PlayerDetail.style.scss';


const PlayerDetail = ({ userDetail }: ProfileEngineProps) => {
  const { user, loading } = useAuthContext()

  const username = user?.username;
  const description = user?.description;
  const created_at = user?.created_at;
  const avatar = user?.avatar;


  return (
    <Card className='player-detail--wrapper'>
      <div>
        {username && <Text h1>{capitalizeFirstLetter(username)}</Text>}
        <Spacer size={SpacerSize.SMALL} y />
        {description ? <Text p>{description}</Text> : <Text p thin italic color={COLORS.GREY}>No bio</Text>}
        <Spacer size={SpacerSize.SMALL} y />
        {created_at && <Text thin italic>{memberSinceDate(created_at)}</Text>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {username && <Avatar username={username} avatarUrl={avatar} size={'xlarge'} />}
      </div>
    </Card>
  )
}

export { PlayerDetail };