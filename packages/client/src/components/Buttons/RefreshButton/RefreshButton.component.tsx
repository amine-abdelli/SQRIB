import React, { useContext } from 'react';
import { Play } from 'react-iconly';
import { MainContext } from '../../../context/MainContext';
import { useWindowSize } from '../../../hooks/useWindowSize';
import Button from '../../../UI/Button/Button.component';
import Spacer from '../../../UI/Spacer/Spacer.component';

function RefreshButton({ disable = false }: { disable?: boolean }) {
  const {
    onRestart,
  } = useContext(MainContext);
  const { isMediumScreen } = useWindowSize();
  return (
    <div style={{ position: 'absolute', right: 0, bottom: 0 }}>
      <Button
        stretch
        onClick={() => onRestart()}
        text={isMediumScreen ? <Play set="light" primaryColor="black" /> : 'Recommencer'}
        disabled={disable}
      />
      <Spacer h="10" />
    </div>
  );
}

RefreshButton.defaultProps = {
  disable: false,
};

export default RefreshButton;
