import { Avatar } from '@nextui-org/react';
import React from 'react';
import { useGetSelf } from '../../hooks/useGetSelf';

function Nav() {
  const { data: selfData, isLoggedIn } = useGetSelf();
  return (
    <div className="w100" style={{ height: '3rem' }}>
      {isLoggedIn && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <h2 style={{ marginBottom: 0 }}>{selfData?.self?.nickname}</h2>
          <Avatar className='pointer ml5' size="md" squared src="https://picsum.photos/200" color="success" bordered />
        </div>
      )}
    </div>
  );
}

export default Nav;
