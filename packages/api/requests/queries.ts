import { gql } from '@apollo/client';

const CREATE_WORD_SET_QUERY = gql`
query generateWordSet($language: String, $difficulty: String) {
  generateWordSet(language: $language)
}`;

const SELF_QUERY = gql`
query selfQuery {
  self {
    email
    nickname
    didacticiel_level
    scores {
      type
      mpm
      wrong_words
      correct_letters
      total_letters
      wrong_letters
      precision
      points
      createdAt
    }
    settings {
      language
      fontSize
      theme
      sound
    }
  },
}
`;

const DIDACTICIEL_WORDSET_QUERY = gql`
query QueryOneSet($letter: String) {
  findOneSet(letter: $letter)
}`;

export { CREATE_WORD_SET_QUERY, SELF_QUERY, DIDACTICIEL_WORDSET_QUERY };
