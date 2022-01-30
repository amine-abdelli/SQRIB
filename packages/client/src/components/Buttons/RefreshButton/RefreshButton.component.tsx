import { Button } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import React, { useContext } from 'react';
import { MainContext } from '../../../context/MainContext';

function RefreshButton({ disable = false }: { disable?: boolean }) {
  const {
    theme,
    onRestart,
  } = useContext(MainContext);

  return (
    <div style={{ marginLeft: '30px' }}>
      <Tooltip2 position='top' content="Rafraichir le page">
        <Button
          style={{
            backgroundColor: disable ? 'rgba(52, 52, 52, 0.3)' : theme?.tertiary,
            borderRadius: '25px',
          }}
          disabled={disable}
          intent="success"
          icon="refresh"
          onClick={() => onRestart()}
        />
      </Tooltip2>
    </div>
  );
}

RefreshButton.defaultProps = {
  disable: false,
};

export default RefreshButton;
