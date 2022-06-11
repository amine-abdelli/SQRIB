import React, { useState } from 'react';
import Link from 'next/link';
import { GiNinjaHead } from 'react-icons/gi';
import {
  Game, Chart, Setting, Home, Logout, Login as LoginIcon, Document,
} from 'react-iconly';
import { BsKeyboard } from 'react-icons/bs';
import { Text } from '@nextui-org/react';
import { LOGOUT_MUTATION } from '@aqac/api';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import styles from './SideBar.module.scss';
import SideBarButton from './SideBarButton/SideBarButton.component';
import { Routes } from '../../utils/enums/Routes.enum';
import { useGetSelf } from '../../hooks/useGetSelf';
import Login from '../Login/Login.component';
import Signup from '../Signup/Signup.component';
import { ModalType } from '../Login/Login.props';
import { useWindowSize } from '../../hooks/useWindowSize';

function SideBar() {
  const { isLoggedIn } = useGetSelf();
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>();
  const router = useRouter();
  const [submitLogout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      router.push(Routes.HOME);
      window.location.reload();
    },
  });
  const buttonStyle = { marginRight: '5px', color: '#dfdad2' };
  function onButtonClick(type: ModalType) {
    setShouldOpenModal(true);
    setModalType(type);
  }
  const { isMediumScreen, width: viewPortWidth } = useWindowSize();
  return (
    <div
      className={styles.sideBarButtons}
    >
      {viewPortWidth > 500 && <Text style={{ fontWeight: 'bold', color: '#dfdad2', fontSize: '28px' }}>{isMediumScreen ? 'S.' : 'SQRIB.IO'}</Text>}
      <ul style={{ width: '100%', margin: '0', color: 'inherit' }}>
        <Link href={Routes.HOME} passHref>
          <SideBarButton icon={<Home set="curved" style={buttonStyle} size={20} />} text="Leaderboard" />
        </Link>
        <Link href={Routes.MAIN} passHref>
          <SideBarButton icon={<GiNinjaHead style={buttonStyle} size={20} />} text="Entraînement" />
        </Link>
        <Link href={Routes.DIDACTICIEL} passHref>
          <SideBarButton icon={<BsKeyboard style={buttonStyle} size={20} />} text="Didacticiel" />
        </Link>
        <Link href={Routes.MULTIGAMING} passHref>
          <SideBarButton icon={<Game style={buttonStyle} size={20} />} text="Multijoueur" />
        </Link>
        {isLoggedIn && (
          <>
            <Link href={Routes.PROFILE} passHref>
              <SideBarButton icon={<Chart style={buttonStyle} size={20} />} text="Stats" />
            </Link>
            <Link href={Routes.SETTINGS} passHref>
              <SideBarButton icon={<Setting style={buttonStyle} size={20} />} text="Paramètres" />
            </Link>
          </>
        )}
      </ul>
      <ul style={{ width: '100%', margin: '0', color: 'inherit' }}>
        {isLoggedIn
          ? (
            <SideBarButton icon={<Logout style={buttonStyle} size={20} />} onClick={() => submitLogout()} text="Logout" />
          )
          : (
            <>
              <SideBarButton icon={<LoginIcon style={buttonStyle} size={20} />} onClick={() => onButtonClick(ModalType.LOGIN)} text="Login" />
              <SideBarButton icon={<Document style={buttonStyle} size={20} />} onClick={() => onButtonClick(ModalType.SIGNUP)} text="Signup" />
            </>
          )}
      </ul>
      <Login
        open={shouldOpenModal && modalType === ModalType.LOGIN}
        setOpen={setShouldOpenModal}
      />
      <Signup
        open={shouldOpenModal && modalType === ModalType.SIGNUP}
        setOpen={setShouldOpenModal}
      />
    </div>
  );
}

export default SideBar;
