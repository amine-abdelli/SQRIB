import React, { useState } from 'react';
import Link from 'next/link';
import { GiNinjaHead } from 'react-icons/gi';
import {
  Game, Chart, Setting, Home,
} from 'react-iconly';
import { BsKeyboard } from 'react-icons/bs';
import { LOGOUT_MUTATION } from '@sqrib/api';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import Image from 'next/image';
import styles from './SideBar.module.scss';
import SideBarButton from './SideBarButton/SideBarButton.component';
import { Routes } from '../../utils/enums/Routes.enum';
import { useGetSelf } from '../../hooks/useGetSelf';
import Login from '../../components/Login/Login.component';
import Signup from '../../components/Signup/Signup.component';
import { ModalType } from '../../components/Login/Login.props';
import PrimaryButton from '../Button/Button.component';
import Logo from '../../components/Logo/Logo.component';
import keyLogo from '../../assets/Images/key-logo.png';
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
  const { isMediumScreen } = useWindowSize();
  console.log(isMediumScreen);
  return (
    <div
      className={styles.sideBar}
    >
      <div>
        {!isMediumScreen && <Image src={keyLogo} alt="A key" />}
        <Logo isMediumScreen={isMediumScreen} />
        <ul style={{ width: '100%', margin: '0', color: 'inherit' }}>
          <Link href={Routes.HOME} passHref>
            <SideBarButton icon={<Home set="curved" style={buttonStyle} size={20} />} text="LEADERBOARD" />
          </Link>
          <Link href={Routes.MAIN} passHref>
            <SideBarButton icon={<GiNinjaHead style={buttonStyle} size={20} />} text="ENTRAÎNEMENT" />
          </Link>
          <Link href={Routes.DIDACTICIEL} passHref>
            <SideBarButton icon={<BsKeyboard style={buttonStyle} size={20} />} text="DIDACTICIEL" />
          </Link>
          <Link href={Routes.MULTIGAMING} passHref>
            <SideBarButton icon={<Game style={buttonStyle} size={20} />} text="MULTIJOUEUR" />
          </Link>
          {isLoggedIn && (
          <>
            <Link href={Routes.PROFILE} passHref>
              <SideBarButton icon={<Chart style={buttonStyle} size={20} />} text="STATS" />
            </Link>
            <Link href={Routes.SETTINGS} passHref>
              <SideBarButton icon={<Setting style={buttonStyle} size={20} />} text="PARAMÊTRES" />
            </Link>
          </>
          )}
        </ul>
      </div>
      <ul style={{ width: '100%', margin: '0', color: 'inherit' }}>
        {isLoggedIn
          ? (
            <PrimaryButton onClick={() => submitLogout()} text="Logout" />
          )
          : (
            <>
              <PrimaryButton onClick={() => onButtonClick(ModalType.LOGIN)} text="Login" />
              <PrimaryButton onClick={() => onButtonClick(ModalType.SIGNUP)} text="Signup" />
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
