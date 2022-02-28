import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '@aqac/api';
import {
  Modal, Button, Spinner, Avatar, Tooltip,
} from '@nextui-org/react';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback, useState } from 'react';
import { Logout } from 'react-iconly';
import { useGetSelf } from '../../hooks/useGetSelf';
import { Routes } from '../../utils/enums';
import Login from '../Login/Login.component';
import Signup from '../Signup/Signup.component';
import styles from './Nav.module.scss';

enum ModalType {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

function Nav() {
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
  return (
    <div className={styles.navbarContainer}>
      <div
        className={styles.navbarContent}
        style={{ borderBottom: '1px solid' }}
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
                <Button.Group>
                  <Button flat onClick={() => onButtonClick(ModalType.LOGIN)}>Se connecter</Button>
                  <Button
                    ghost
                    onClick={() => onButtonClick(ModalType.SIGNUP)}
                  >
                    S&apos;inscrire

                  </Button>
                </Button.Group>
                <Modal
                  closeButton
                  className='p2r'
                  open={shouldOpenModal}
                  onClose={() => setShouldOpenModal(false)}
                  blur
                >
                  {modalType === ModalType.LOGIN && (<Login />)}
                  {modalType === ModalType.SIGNUP && (<Signup />)}
                </Modal>
              </>
            )}

        </div>
        )}
        <div
          className='flex align-center justify-center'
        >
          <h2 style={{ marginBottom: 0 }}>{data?.self?.nickname}</h2>
          <Tooltip hidden={!isLoggedIn} trigger='click' hideArrow placement='bottom' content={<Button bordered auto color='error' icon={<Logout />} onClick={() => submitLogout()} />}>
            <Avatar className='pointer ml5' size="md" squared src="https://picsum.photos/200" color="success" bordered />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Nav;
