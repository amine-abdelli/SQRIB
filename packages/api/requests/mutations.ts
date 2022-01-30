import { gql, DocumentNode } from '@apollo/client';

const LOGIN_MUTATION: DocumentNode = gql`
mutation loginMutation($email: String, $password: String) {
  login(email: $email, password: $password) {
    user {
      email
    }
  }
}`;

const LOGOUT_MUTATION: DocumentNode = gql`
mutation logoutMutation {
  logout
}`;

const SIGNUP_MUTATION: DocumentNode = gql`
mutation signupMutation($email: String, $password: String, $nickname: String) {
  signup(email: $email, password: $password, nickname: $nickname) {
    user {
      email
      nickname
    }
  }
}
`;

const ADD_NEW_SCORE_MUTATION: DocumentNode = gql`
mutation addNewScoreMutation($timing: String, $mpm: Int, $wrongWords: Int, $correctLetters: Int, $totalLetters: Int, $wrongLetters: Int, $precision: Float, $points: Int, $gameMode: String) {
  addScoring(timing: $timing, mpm: $mpm, wrong_words: $wrongWords, correct_letters: $correctLetters, total_letters: $totalLetters, wrong_letters: $wrongLetters, precision: $precision, points: $points, game_mode: $gameMode) {
    mpm
    wrong_words
    timing
    id
    correct_letters
    total_letters
    precision
    wrong_letters
    points
    game_mode
    createdAt
  }
}
`;

const UPDATE_LEVEL_MUTATION = gql`
mutation updateLevelMutation($level: Int) {
  updateLevel(level: $level)
}`;

export {
  LOGIN_MUTATION, LOGOUT_MUTATION, SIGNUP_MUTATION, ADD_NEW_SCORE_MUTATION, UPDATE_LEVEL_MUTATION,
};
