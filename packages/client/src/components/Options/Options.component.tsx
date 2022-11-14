import { useApolloClient, useMutation } from '@apollo/client';
import { SELF_QUERY, UPDATE_SETTINGS_MUTATION } from '@sqrib/api';
import { Languages } from '@sqrib/utils';
import React, { useContext, useEffect, useState } from 'react';
import { VolumeDown, VolumeOff } from 'react-iconly';
import { theme } from '../../../styles/theme';
import { MainContext } from '../../context/MainContext';
import Button from '../../UI/Button/Button.component';
import styles from './Options.module.scss';
import { ISettingsProps, OptionsProps } from './Options.props';

function Options({
  fontSize: isFontSizeActive,
  language: isLanguageActive,
  sound: isSoundActive,
}: OptionsProps) {
  const [sound, setSound] = useState<boolean>(false);
  const { cache } = useApolloClient();
  const {
    language, setLanguage, fontSize, setFontSize,
  } = useContext(MainContext);

  const [updateSettings] = useMutation(
    UPDATE_SETTINGS_MUTATION,
    {
      onCompleted: (payload) => {
        const result = cache.readQuery<any, void>({ query: SELF_QUERY });
        const self = result?.self;
        cache.writeQuery({
          query: SELF_QUERY,
          data: {
            self: {
              ...self,
              settings: {
                ...payload.updateSettings,
              },
            },
          },
        });
      },
    },
  );

  useEffect(() => {
    const settings: ISettingsProps = {
      language,
      fontSize,
      theme: false,
      sound: false,
    };
    updateSettings({ variables: settings });
  }, [language, fontSize, sound, updateSettings]);

  return (
    <div className={styles.optionsWrapper}>
      {isLanguageActive && (
        <>
          <div className={styles.buttonGroup}>
            <Button
              className={styles.optionLanguageButton}
              style={{ width: 'inherit' }}
              color={language === Languages.FR ? theme.primary : ''}
              onClick={() => setLanguage(Languages.FR)}
              light
              text="français"
            />
            <Button
              className={styles.optionLanguageButton}
              style={{ width: 'inherit' }}
              color={language === Languages.EN ? theme.primary : ''}
              onClick={() => setLanguage(Languages.EN)}
              light
              text="anglais"
            />
            <Button
              className={styles.optionLanguageButton}
              style={{ width: 'inherit' }}
              color={language === Languages.ES ? theme.primary : ''}
              onClick={() => setLanguage(Languages.ES)}
              light
              text="espagnole"
            />
            <Button
              className={styles.optionLanguageButton}
              color={language === Languages.DE ? theme.primary : ''}
              style={{ width: 'inherit' }}
              onClick={() => setLanguage(Languages.DE)}
              light
              text="allemand"
            />
          </div>
          <span className={styles.separator}>|</span>
        </>
      )}
      {isFontSizeActive
      && (
      <>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.optionLanguageButton}
            style={{ width: 'inherit' }}
            color={fontSize === 30 ? theme.primary : ''}
            onClick={() => setFontSize(30)}
            light
            text="small"
          />
          <Button
            className={styles.optionLanguageButton}
            style={{ width: 'inherit' }}
            color={fontSize === 36 ? theme.primary : ''}
            onClick={() => setFontSize(36)}
            light
            text="medium"
          />
          <Button
            className={styles.optionLanguageButton}
            color={fontSize === 48 ? theme.primary : ''}
            style={{ width: 'inherit' }}
            onClick={() => setFontSize(48)}
            light
            text="large"
          />
          <Button
            className={styles.optionLanguageButton}
            color={fontSize === 60 ? theme.primary : ''}
            style={{ width: 'inherit' }}
            onClick={() => setFontSize(60)}
            light
            text="extra-large"
          />
        </div>
        <span className={styles.separator}>|</span>
      </>
      )}
      {isSoundActive && <Button light style={{ width: 'inherit' }} text={sound ? <VolumeOff set="light" /> : <VolumeDown set="light" />} onClick={() => setSound(!sound)} />}
    </div>
  );
}

export default Options;
