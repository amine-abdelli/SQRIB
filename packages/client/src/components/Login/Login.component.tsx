import React from 'react';
import Button from '../Buttons/Button.component';

function Login() {
  return (
    <div>
      <div style={{
        borderRadius: '50px', border: '1px solid #343434', height: '15px', width: '15px',
      }}
      />
      <Button onClick={() => null}>login</Button>
    </div>
  );
}

export default Login;
