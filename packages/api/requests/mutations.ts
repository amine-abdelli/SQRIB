import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
mutation Mutation($email: String, $password: String) {
  login(email: $email, password: $password) {
    user {
      email
    }
  }
}`;

const LOGOUT_MUTATION = gql`
mutation Mutation {
  logout
}`;

export { LOGIN_MUTATION, LOGOUT_MUTATION };
