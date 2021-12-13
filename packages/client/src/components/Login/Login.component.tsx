import { useMutation } from '@apollo/client';
import { Form, Input } from 'antd';
import React from 'react';
import { LOGIN_MUTATION } from '@aqac/api';
import { Button, Divider } from '@blueprintjs/core';

function Login() {
  const [submitLogin] = useMutation(LOGIN_MUTATION, {
    onCompleted: () => {
      window.location.reload();
    },
  });

  const onFinish = (values: any) => {
    submitLogin({
      variables: {
        ...values,
        email: values.email.trim(),
      },
    });
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>S&apos;identifier</h1>
      <Form
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'This E-mail is not valid',
            },
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input placeholder="john.doe@gmail.com" type="email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Divider />
        <Form.Item>
          <Button type="submit" autoFocus={false} fill intent="primary">
            se connecter
          </Button>
          <div>
            <Button fill intent="none" onClick={() => null}>Mot de passe oublié ?</Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
