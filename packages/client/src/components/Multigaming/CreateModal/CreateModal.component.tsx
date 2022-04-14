import {
  Button, Input, Modal, Radio, Text,
} from '@nextui-org/react';
import { languages, wordAmount } from '@aqac/utils';
import React, { useEffect } from 'react';
import { onFormChange } from '../../../utils/form';
import { CreateModalProps, defaultGameParameters } from './CreateModal.props';

function CreateModal({
  isVisible, setIsVisible, setRoomID, setHasJoined, username, setGameParameters, gameParameters,
}: CreateModalProps) {
  const defaultInputValue = `[${gameParameters.language.toLocaleUpperCase()}] ${gameParameters.wordAmount} ${gameParameters.private ? 'privé' : 'public'} hosted by ${username}`;
  useEffect(() => {
    setRoomID(defaultInputValue);
  }, [defaultInputValue]);
  return (
    <Modal
      aria-labelledby="Create room modal"
      open={isVisible}
      onClose={() => setIsVisible(false)}
    >
      <div className='m20 flex flex-column'>
        <Text h3 className='text-center'>Créer une partie</Text>
        <Input
          color='primary'
          bordered
          css={{ width: '100%' }}
          value={defaultInputValue}
          disabled
          onChange={(e) => setRoomID(e.target.value)}
        />
        <Radio.Group
          value={gameParameters.language}
          onChange={(e) => onFormChange(e, 'language', setGameParameters, gameParameters)}
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          {languages.map(({ flag, country }) => (
            <Radio value={country} style={{ display: 'inline-block' }} key={country}>
              <Text>{flag}</Text>
            </Radio>
          ))}
        </Radio.Group>
        <Radio.Group
          value={gameParameters.wordAmount}
          onChange={(e) => onFormChange(e, 'wordAmount', setGameParameters, gameParameters)}
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          {Object.values(wordAmount).map((words) => (
            <Radio value={words} style={{ display: 'inline-block' }} key={words}>
              <Text>{words}</Text>
            </Radio>
          ))}
        </Radio.Group>
        {/* <Checkbox
          style={{ justifySelf: 'flex-start' }}
          initialChecked={false}
          onChange={(e) =>
            onFormChange(e.target.checked, 'private', setGameParameters, gameParameters)}
        >
          Partie privée
        </Checkbox> */}
        <Button
          animated
          css={{
            width: '100%',
          }}
          onClick={() => setHasJoined(true)}
        >
          Créer une partie
        </Button>
        <Button
          bordered
          animated
          css={{
            width: '100%',
          }}
          onClick={() => {
            setIsVisible(false);
            setGameParameters(defaultGameParameters);
          }}
        >
          Annuler
        </Button>
      </div>
    </Modal>
  );
}

export default CreateModal;
