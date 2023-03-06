import { Card } from '@blueprintjs/core';
import React from 'react';
import { BsInbox } from 'react-icons/bs';

function Empty() {
  return (
    <Card
      className='flex justify-center align-center flex-column w100'
    >
      <p style={{ fontSize: '30px', margin: '0' }}>No data</p>
      <BsInbox size={75} />
    </Card>
  );
}

export default Empty;
