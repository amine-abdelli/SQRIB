import React, { Dispatch, SetStateAction, useState } from 'react';
import Link from 'next/link';
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
import ClosingCross from '../ClosingCross/ClosingCross.component';
import Spacer from '../Spacer/Spacer.component';

interface SideBarProps {
  fullScreen?: boolean,
  isMenuOpen: boolean,
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

function SideBar({ fullScreen, isMenuOpen, setIsMenuOpen }: SideBarProps) {
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
  function onButtonClick(type: ModalType) {
    setShouldOpenModal(true);
    setModalType(type);
  }
  return (
    <div
      className={styles.sideBar}
      style={{
        display: !isMenuOpen && fullScreen ? 'none' : '',
      }}
    >
      {/* Show closing cross on mobile only when menu is fullscreen */}
      <ClosingCross display={!!(isMenuOpen && fullScreen)} onClose={setIsMenuOpen} />
      <div
        className={styles.sideBarButtonsWrapper}
      >
        {!fullScreen && <Image src={keyLogo} alt="A keyboard key representing sqrib logo" />}
        <Logo />
        <ul style={{ width: '100%', margin: '0', color: 'inherit' }}>
          <Link href={Routes.HOME} passHref>
            <SideBarButton text="LEADERBOARD" />
          </Link>
          <Link href={Routes.MAIN} passHref>
            <SideBarButton text="ENTRAÎNEMENT" />
          </Link>
          <Link href={Routes.DIDACTICIEL} passHref>
            <SideBarButton text="DIDACTICIEL" />
          </Link>
          <Link href={Routes.MULTIGAMING} passHref>
            <SideBarButton text="MULTIJOUEUR" />
          </Link>
          {isLoggedIn && (
            <>
              <Link href={Routes.PROFILE} passHref>
                <SideBarButton text="STATS" />
              </Link>
              <Link href={Routes.SETTINGS} passHref>
                <SideBarButton text="PARAMÊTRES" />
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
              <Spacer h="10" />
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

SideBar.defaultProps = {
  fullScreen: false,
};

export default SideBar;
