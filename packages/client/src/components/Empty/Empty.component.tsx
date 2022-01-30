import { Card } from '@blueprintjs/core';
import React from 'react';
import { BsInbox } from 'react-icons/bs';

function Empty() {
  return (
    <Card style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%',
    }}
    >
      <p style={{ fontSize: '30px', margin: '0' }}>No data</p>
      <BsInbox size={75} />
    </Card>
  );
}

export default Empty;
