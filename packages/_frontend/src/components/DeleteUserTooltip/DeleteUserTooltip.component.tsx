import React, { useState } from 'react';
import Button from '../../UI/Button/Button.component';
import Input from '../../UI/Input/Input.component';
import Spacer from '../../UI/Spacer/Spacer.component';
import { theme } from '../../../styles/theme';

function DeleteUserTooltip({ userDeletionHandler, setIsVisible, email }: any) {
  const [password, setPassword] = useState<string>();
  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ textAlign: 'center' }}>Confirmer</h2>
      <Spacer />
      <p>
        Êtes-vous sûr de vouloir supprimer votre compte ?
        Toutes vos données seront perdues.
      </p>
      <Spacer />
      <h5>
        Veuillez saisir votre mot de passe puis cliquer sur Supprimer mon compte
        pour valider la suppression de votre compte.
      </h5>
      <Spacer />
      <div
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Input type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
        <Button
          style={{ background: theme.error, color: 'white' }}
          color="error"
          onClick={() => {
            userDeletionHandler({
              variables: {
                email,
                password,
              },
            });
            setIsVisible(false);
          }}
          text='Supprimer mon compte'
        />
      </div>
    </div>
  );
}

export default DeleteUserTooltip;
