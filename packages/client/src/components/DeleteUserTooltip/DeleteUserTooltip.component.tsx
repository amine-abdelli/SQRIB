import {
  Button, Container, Input, Spacer, Text,
} from '@nextui-org/react';
import React, { useState } from 'react';

function DeleteUserTooltip({ userDeletionHandler, setIsVisible, email }: any) {
  const [password, setPassword] = useState<string>();
  return (
    <Container style={{ padding: '1rem' }}>
      <Text style={{ textAlign: 'center' }} h3>Confirmer</Text>
      <Spacer />
      <Text>
        Êtes-vous sûr de vouloir supprimer votre compte ?
        Toutes vos données seront perdues.
      </Text>
      <Spacer />
      <Text h5>Veuillez saisir votre mot de passe.</Text>
      <Spacer />
      <div
        className='justify-around flex'
      >
        <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
        <Button
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
        >
          Supprimer
        </Button>
      </div>
    </Container>
  );
}

export default DeleteUserTooltip;
