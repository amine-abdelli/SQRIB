import { Button } from '@nextui-org/react';
import React, { useContext } from 'react';
import { Play } from 'react-iconly';
import { MainContext } from '../../../context/MainContext';

function RefreshButton({ disable = false }: { disable?: boolean }) {
  const {
    theme,
    onRestart,
  } = useContext(MainContext);

  return (
    <div style={{ marginLeft: '10px' }}>
      <Button
        style={{
          backgroundColor: disable ? 'rgba(52, 52, 52, 0.3)' : theme?.tertiary,
        }}
        auto
        disabled={disable}
        icon={<Play set="light" primaryColor="white" />}
        onClick={() => onRestart()}
      />
    </div>
  );
}

RefreshButton.defaultProps = {
  disable: false,
};

export default RefreshButton;
