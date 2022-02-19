import { useApolloClient, useMutation } from '@apollo/client';
import {
  SELF_QUERY, UPDATE_SETTINGS_MUTATION, UPDATE_NICKNAME_MUTATION, UPDATE_PASSWORD_MUTATION,
  DELETE_USER_MUTATION,
} from '@aqac/api';
import { languages } from '@aqac/utils';
import {
  Button, Checkbox, Container, Input, Spacer, Switch, Text, Tooltip,
} from '@nextui-org/react';
import { useRouter } from 'next/dist/client/router';
import React, { useContext, useEffect, useState } from 'react';
import {
  Delete,
  Password,
} from 'react-iconly';
import { BiMoon, BiSun } from 'react-icons/bi';
import { MainContext } from '../src/context/MainContext';
import DeleteUserTooltip from '../src/components/DeleteUserTooltip/DeleteUserTooltip.component';
import { useGetSelf } from '../src/hooks/useGetSelf';
import { Routes } from '../src/utils/enums';
import styles from '../styles/sass/pages/_settings.module.scss';
import { themes } from '../styles/theme';
import WithAuth from '../src/components/withAuth/withAuth.hoc';

const fontSizes = [24, 30, 36, 48, 60];

interface ISettingsProps {
  language: string;
  fontSize: number;
  theme: boolean;
  sound: boolean;
}

// ! TODO: Refactor cache update into one function
function Settings() {
  const { data } = useGetSelf();
  const { cache } = useApolloClient();
  const router = useRouter();
  const selfSettings = data?.self.settings;
  const { setFontSize, setLanguage, setTheme } = useContext(MainContext);
  const [updateNickname] = useMutation(UPDATE_NICKNAME_MUTATION, {
    onCompleted: (payload) => {
      setNewNickname('');
      const result = cache.readQuery<any, void>({ query: SELF_QUERY });
      const self = result?.self;
      cache.writeQuery({
        query: SELF_QUERY,
        data: {
          self: {
            ...self,
            nickname: payload.updateNickname.nickname,
          },
        },
      });
    },
  });
  const [passwordUpdateHandler] = useMutation(UPDATE_PASSWORD_MUTATION, {
    onCompleted: () => setUpdatePasswordParams({
      actualPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    }),
  });

  const [userDeletionHandler] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      router.push(Routes.MAIN);
    },
  });

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
  const [newNickname, setNewNickname] = useState<string>();
  const [isUserDeletionTooltipVisible, setIsUserDeletionTooltipVisible] = useState<boolean>(false);
  const [updatePasswordParams, setUpdatePasswordParams] = useState<{
    actualPassword: string,
    newPassword: string,
    newPasswordConfirmation: string
  }>({
    actualPassword: '', newPassword: '', newPasswordConfirmation: '',
  });

  const [languageSelected, setLanguageSelected] = useState<string>(
    selfSettings?.language,
  );
  const [fontSizeSelected, setFontSizeSelected] = useState<number>(
    selfSettings?.fontSize,
  );
  const [darkMode, setDarkMode] = useState<boolean>(selfSettings?.theme);
  const [isSoundActive, setIsSoundActive] = useState<boolean>(selfSettings?.sound);

  useEffect(() => {
    const settings: ISettingsProps = {
      language: languageSelected,
      fontSize: fontSizeSelected,
      theme: darkMode,
      sound: isSoundActive,
    };
    setFontSize(fontSizeSelected);
    setLanguage(languageSelected);
    setTheme(darkMode ? themes.LIGHT : themes.DARK);
    // setSound(isSoundActive);
    updateSettings({ variables: { ...settings } });
  }, [languageSelected, fontSizeSelected, darkMode, isSoundActive]);

  function onSettingParameterSelection(param: string | number | boolean, setState: any) {
    setState(param);
  }

  function onPasswordUpdate() {
    const { actualPassword, newPassword, newPasswordConfirmation } = updatePasswordParams;
    if (newPassword === newPasswordConfirmation) {
      passwordUpdateHandler({
        variables: {
          password: actualPassword,
          newPassword,
        },
      });
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Text h2>Général</Text>
      <Container>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text h3>Langues</Text>
          <Button.Group bordered>
            {languages.map(({ flag, country }) => (
              <Button
                key={country}
                onClick={() => onSettingParameterSelection(country, setLanguageSelected)}
                flat={selfSettings?.language === country}
              >
                {flag}
              </Button>
            ))}
          </Button.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text h3>Taille de police</Text>
          <Button.Group bordered>
            {fontSizes.map((fontSize: number) => (
              <Button
                key={fontSize}
                onClick={() => onSettingParameterSelection(fontSize, setFontSizeSelected)}
                flat={selfSettings?.fontSize === fontSize}
              >
                <Tooltip
                  content={<Text size={fontSize}>Lorem ipsum ...</Text>}
                >
                  <Text size={fontSize}>A</Text>
                </Tooltip>
              </Button>
            ))}
          </Button.Group>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text h3>Sons</Text>
          <Checkbox
            checked={selfSettings?.sound}
            onChange={(e) => onSettingParameterSelection(e.target.checked, setIsSoundActive)}
          >
            Activez les sons
          </Checkbox>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text h3>Thème</Text>
          <Switch
            checked={Boolean(selfSettings?.theme)}
            onChange={(e) => onSettingParameterSelection(e.target.checked, setDarkMode)}
            size="xl"
            iconOn={<BiMoon />}
            iconOff={<BiSun />}
          />
        </div>
      </Container>
      <Spacer y={2} />
      <Text h2>Mon compte</Text>
      <Spacer />
      <Container>
        <Text h4>
          Modifier mon pseudo
        </Text>
        <div style={{ justifyContent: 'space-between' }} className={styles.inputGroup}>
          <Input value={newNickname} onChange={(e) => setNewNickname(e.target.value)} placeholder="Nouveau pseudonyme" />
          <Button
            onClick={() => {
              updateNickname({ variables: { nickname: newNickname } });
            }}
            auto
          >
            Enregistrer
          </Button>
        </div>
      </Container>
      <Spacer />
      <Container>
        <Text h4>
          Modifier mon mot de passe
        </Text>
        <div className={styles.inputGroup}>
          <Input type="password" value={updatePasswordParams.actualPassword} onChange={(e) => setUpdatePasswordParams({ ...updatePasswordParams, actualPassword: e.target.value })} placeholder="Ancien mot de passe" />
          <Input type="password" value={updatePasswordParams.newPassword} onChange={(e) => setUpdatePasswordParams({ ...updatePasswordParams, newPassword: e.target.value })} placeholder="Nouveau mot de passe" />
          <Input type="password" value={updatePasswordParams.newPasswordConfirmation} onChange={(e) => setUpdatePasswordParams({ ...updatePasswordParams, newPasswordConfirmation: e.target.value })} placeholder="Confirmer mot de passe" />
          <Button auto onClick={onPasswordUpdate}><Password /></Button>
        </div>
      </Container>
      <Spacer />
      <Container>
        <Text h4>Supprimer mon compte</Text>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
        >
          <Text>
            Si vous supprimez votre compte, il n&apos;y a pas de retour en arrière possible.
          </Text>
          <Tooltip
            visible={isUserDeletionTooltipVisible}
            hideArrow
            trigger="click"
            content={(
              <DeleteUserTooltip
                email={data?.self.email}
                userDeletionHandler={userDeletionHandler}
                setIsVisible={setIsUserDeletionTooltipVisible}
              />
            )}
          >
            <Button onClick={() => setIsUserDeletionTooltipVisible(true)} auto style={{ marginLeft: '1rem' }} ghost color="error">
              <Delete />
            </Button>
          </Tooltip>
        </div>
      </Container>
      <Spacer />
    </div>
  );
}

export default WithAuth(Settings);
