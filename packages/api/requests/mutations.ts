import { gql, DocumentNode } from '@apollo/client';

const LOGIN_MUTATION: DocumentNode = gql`
mutation Mutation($email: String, $password: String) {
  login(email: $email, password: $password) {
    user {
      email
    }
  }
}`;

const LOGOUT_MUTATION: DocumentNode = gql`
mutation Mutation {
  logout
}`;

const SIGNUP_MUTATION: DocumentNode = gql`
mutation Mutation($email: String, $password: String, $nickname: String) {
  signup(email: $email, password: $password, nickname: $nickname) {
    user {
      email
      nickname
    }
  }
}
`;

export { LOGIN_MUTATION, LOGOUT_MUTATION, SIGNUP_MUTATION };
