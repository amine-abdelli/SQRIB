import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '@aqac/api';
import {
  Dialog, Button, Icon, Spinner, Tabs, Tab,
} from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback, useState } from 'react';
import { useGetSelf } from '../../hooks/useGetSelf';
import { Routes } from '../../utils/enums';
import Login from '../Login/Login.component';
import SettingMenu from '../SideBar/SettingMenu/SettingMenu.component';
import Signup from '../Signup/Signup.component';
import styles from './Nav.module.scss';
import { INav } from './Nav.props';

enum ModalType {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

function Nav({
  theme, setTheme, setLanguage, setFontSize, startCountDown,
}: INav) {
  const router = useRouter();
  const [submitLogout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      router.push(Routes.MAIN);
      window.location.reload();
    },
  });
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>();
  const { isLoggedIn, data, loading } = useGetSelf();

  const onButtonClick = useCallback(
    (type?: ModalType) => {
      if (type) {
        setModalType(type);
      } else {
        setModalType(null);
      }
      setShouldOpenModal(true);
    },
    [],
  );
  const menu = (
    <SettingMenu
      submitLogout={submitLogout}
      setLanguage={setLanguage}
      setFontSize={setFontSize}
      setTheme={setTheme}
      theme={theme}
      isLoggedIn={isLoggedIn}
      startCountDown={startCountDown}
    />
  );
  return (
    <div className={styles.navbarContainer}>
      <div
        className={styles.navbarContent}
        style={{ color: theme?.secondary, borderBottom: `1px ${theme?.secondary} solid` }}
      >
        にぎやか
      </div>
      <div style={{
        position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center',
      }}
      >
        {!isLoggedIn && (
        <div>
          {loading ? <Spinner />
            : (
              <>
                <Button intent="none" onClick={() => onButtonClick(ModalType.LOGIN)} text="se connecter" />
                <Button intent="primary" onClick={() => onButtonClick(ModalType.SIGNUP)} text="s'inscrire" />
                <Dialog
                  style={{ padding: '2rem' }}
                  isOpen={shouldOpenModal}
                  onClose={() => setShouldOpenModal(false)}
                >
                  <Tabs
                    defaultSelectedTabId={modalType === ModalType.LOGIN ? 'login' : 'signup'}
                    animate
                    id="TabsExample"
                    vertical={false}
                  >
                    <Tab id="login" title="se connecter" panel={<Login />} />
                    <Tab id="signup" title="s'inscrire" panel={<Signup />} />
                    <Tabs.Expander />
                  </Tabs>
                </Dialog>
              </>
            )}

        </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ marginBottom: 0, color: theme.secondary }}>{data?.self?.nickname}</h2>
          <Popover2 hasBackdrop content={menu} placement="bottom-start">
            <div style={{
              cursor: 'pointer', backgroundColor: 'white', borderRadius: '50px', border: '1px solid black', width: '35px', height: '35px', display: 'flex', margin: '10px',
            }}
            >
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%', position: 'absolute', backgroundColor: isLoggedIn ? '#00ff00' : 'red', border: '1px solid green',
              }}
              />
              <Icon style={{ margin: 'auto' }} icon="person" />
            </div>
          </Popover2>
        </div>
      </div>
    </div>
  );
}

export default Nav;
