import React, { useState } from 'react';
import {
  formatDateToLeaderboard, Languages,
} from '@sqrib/utils';
import { useLazyQuery } from '@apollo/client';
import { USER_GAME_DETAILS_QUERY } from '@sqrib/api';
import { LeaderBoardProps } from './LeaderBoard.props';
// import { suffixPosition } from '../../utils/numbers.utils';
// import crown_svg from '../../assets/Images/crown-solid.svg';
// import star_svg from '../../assets/Images/star-solid.svg';
// import { multiColumns, soloColumns } from './columns';
import PlayerDetailsModal from './subComponent/PlayerDetails/PlayerDetails.component';
import Table from '../../UI/Table/Table.component';
import Select from '../../UI/Select/Select.component';

const scoreTemplate = {
  userId: null, // Helps identifying the last item to make it take the rest of the remaining height
  position: null,
  mpm: null,
  username: null,
  precision: null,
  victory: null,
  date: null,
  key: Date.now(),
};

function LeaderBoardTable({
  scores, title, winnerBoard, style, columns,
}: LeaderBoardProps) {
  const [fetchUserGameDetails, { data, loading }] = useLazyQuery(USER_GAME_DETAILS_QUERY);
  const [shouldDisplayPlayerDetails, setShouldDisplayPlayerDetails] = useState(false);
  const [langKey, setLangKey] = useState(Languages.FR);
  // Fetch user's data
  const scoresToTableData = scores && scores?.[langKey]
    ?.filter(({ username }) => username)
    ?.map((score, index) => ({
      userId: score.userId,
      position: index + 1,
      mpm: score.mpm,
      username: score.username,
      precision: score.precision,
      victory: winnerBoard?.[score.username]?.length || 0,
      date: formatDateToLeaderboard(score.created_at as any),
      key: index,
    }));
  function fetchUserGamingData(userId: string) {
    setShouldDisplayPlayerDetails(true);
    fetchUserGameDetails({
      variables: {
        userId,
      },
    });
  }
  console.log('data', data);
  return (
    <div style={style}>
      <Table
        dataSource={[...scoresToTableData, scoreTemplate]}
        columns={columns(fetchUserGamingData)}
        scrollable
        header={(
          <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 0, padding: '0 15px', fontFamily: 'Poppins',
          }}
          >
            <h2 style={{ margin: 0, padding: 0 }}>{title}</h2>
            <Select value={langKey} onChange={(e) => setLangKey(e as Languages)} />
          </div>
        )}
      />
      <PlayerDetailsModal
        loading={loading}
        data={data?.fetchUserGamingDetails}
        isOpen={shouldDisplayPlayerDetails}
        setIsOpen={() => setShouldDisplayPlayerDetails(false)}
      />
    </div>
  );
}

export default LeaderBoardTable;
