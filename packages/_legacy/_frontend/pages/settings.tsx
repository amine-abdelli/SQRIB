import { useMutation } from '@apollo/client';
import {
  UPDATE_PASSWORD_MUTATION,
  DELETE_USER_MUTATION,
} from '@sqrib/api';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import DeleteUserTooltip from '../src/components/DeleteUserTooltip/DeleteUserTooltip.component';
import { useGetSelf } from '../src/hooks/useGetSelf';
import { Routes } from '../src/utils/enums';
import styles from '../styles/sass/pages/_settings.module.scss';
import WithAuth from '../src/components/withAuth/withAuth.hoc';
import { alertService } from '../services';
import { useWindowSize } from '../src/hooks/useWindowSize';
import Card from '../src/UI/Card/Card.component';
import Input from '../src/UI/Input/Input.component';
import Button from '../src/UI/Button/Button.component';
import Spacer from '../src/UI/Spacer/Spacer.component';
import Modal from '../src/UI/Modal/Modal.component';
import { theme } from '../styles/theme';

function Settings() {
  const { data, loading } = useGetSelf();
  const router = useRouter();

  const [passwordUpdateHandler] = useMutation(UPDATE_PASSWORD_MUTATION, {
    onCompleted: () => {
      alertService.success('Votre mot de passe a bien été modifié', {});
      setUpdatePasswordParams({
        actualPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      });
    },
    onError: () => alertService.error('Une erreur est survenue lors de la modification de votre mot de passe', {}),
  });

  const [userDeletionHandler] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      alertService.success('Votre compte a bien été supprimé', {});
      router.push(Routes.MAIN);
    },
    onError: () => alertService.error('Une erreur est survenue lors de la suppression de votre compte', {}),
  });

  const [isUserDeletionTooltipVisible, setIsUserDeletionTooltipVisible] = useState<boolean>(false);
  const [updatePasswordParams, setUpdatePasswordParams] = useState<{
    actualPassword: string,
    newPassword: string,
    newPasswordConfirmation: string
  }>({
    actualPassword: '', newPassword: '', newPasswordConfirmation: '',
  });

  const { isMediumScreen } = useWindowSize();

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
  if (loading) <p>loading...</p>;
  return (
    <div className='flex justify-center' style={{ padding: '20px', flexDirection: isMediumScreen ? 'column' : 'row' }}>
      <Card width='300' shadowed>
        <h4>
          Modifier mon mot de passe
        </h4>
        <div
          className={styles.inputGroup}
          style={{ flexDirection: 'column' }}
        >
          <Input type="password" value={updatePasswordParams.actualPassword} onChange={(e) => setUpdatePasswordParams({ ...updatePasswordParams, actualPassword: e.target.value })} placeholder="Ancien mot de passe" />
          <Input type="password" value={updatePasswordParams.newPassword} onChange={(e) => setUpdatePasswordParams({ ...updatePasswordParams, newPassword: e.target.value })} placeholder="Nouveau mot de passe" />
          <Input type="password" value={updatePasswordParams.newPasswordConfirmation} onChange={(e) => setUpdatePasswordParams({ ...updatePasswordParams, newPasswordConfirmation: e.target.value })} placeholder="Confirmer mot de passe" />
          <Button
            onClick={onPasswordUpdate}
            text='Modifier mot de passe'
          />
        </div>
      </Card>
      <Spacer w='20' h='20' />
      <Card width='300' shadowed>
        <h4>Supprimer mon compte</h4>
        <div
          className='flex justify-between align-center'
          style={{ flexDirection: 'column' }}
        >
          <p>
            Si vous supprimez votre compte, il n&apos;y a pas de retour en arrière possible.
          </p>
          <Button
            style={{ background: theme.error, color: 'white' }}
            text={(
              <>
                Supprimer mon compte
              </>
            )}
            onClick={() => setIsUserDeletionTooltipVisible(true)}
          />
          <Modal
            isOpen={isUserDeletionTooltipVisible}
            setIsOpen={() => setIsUserDeletionTooltipVisible(false)}
            blur
            closeable
            darkCross
          >
            <Modal.Body>
              <DeleteUserTooltip
                email={data?.self.email}
                userDeletionHandler={userDeletionHandler}
                setIsVisible={setIsUserDeletionTooltipVisible}
              />
            </Modal.Body>
          </Modal>
        </div>
      </Card>
    </div>
  );
}

export default WithAuth(Settings);
