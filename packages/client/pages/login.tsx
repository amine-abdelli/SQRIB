import { useMutation } from '@apollo/client';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { LOGIN_MUTATION } from '@aqac/api';
import { NextRouter, useRouter } from 'next/dist/client/router';

function Login() {
  const router: NextRouter = useRouter();
  const [submitLogin] = useMutation(LOGIN_MUTATION, {
    onCompleted: () => {
      router.push('/main');
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
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          se connecter
        </Button>
        <div>
          <Button type="link" onClick={() => null}>Mot de passe oublié ?</Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default Login;
