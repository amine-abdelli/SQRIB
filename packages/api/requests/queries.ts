import { gql } from '@apollo/client';

const CREATE_WORD_SET_QUERY = gql`
query generateWordSet($language: String, $difficulty: String) {
  generateWordSet(language: $language)
}`;

const SELF_QUERY = gql`
query Query {
  self {
    email
  }
}
`;

export { CREATE_WORD_SET_QUERY, SELF_QUERY };
