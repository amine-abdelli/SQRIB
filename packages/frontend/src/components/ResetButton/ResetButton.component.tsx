import React from 'react';
import { Play } from 'react-iconly';
import { useWindowSize } from '../../hooks/useWindowSize.hook';
import { Button } from '../Button/Button.component';
import { Spacer, SpacerSize } from '../Spacer';
import './ResetButton.style.scss';

function ResetButton({ disable = false, onClick }: {
  disable?: boolean, onClick: (p: boolean) => void }) {
  const { isMediumScreen } = useWindowSize();
  return (
    <div className='reset-button' >
      <Button
        stretch
        onClick={() => onClick(true)}
        label={isMediumScreen ? <Play set="light" primaryColor="black" /> : 'Recommencer'}
        disabled={disable}
      />
      <Spacer size={SpacerSize.MEDIUM} />
    </div>
  );
}

ResetButton.defaultProps = {
  disable: false,
};

export { ResetButton };
