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
mutation addNewScoreMutation($mpm: Int, $wrongWords: Int, $correctLetters: Int, $totalLetters: Int, $wrongLetters: Int, $precision: Float, $points: Int, $type: String, $userId: String, $gameId: String, $username: String, $language: String, $timer: Int) {
  addScoring(mpm: $mpm, wrong_words: $wrongWords, correct_letters: $correctLetters, total_letters: $totalLetters, wrong_letters: $wrongLetters, precision: $precision, points: $points, type: $type, userId: $userId, gameId: $gameId, username: $username, language: $language, timer: $timer) {
    id
    type
    mpm
    wrong_words
    correct_letters
    total_letters
    wrong_letters
    precision
    points
    created_at
    userId
    gameId
    timer
    username
    language
  }
}
`;

const UPDATE_LEVEL_MUTATION = gql`
mutation updateLevelMutation($level: Int) {
  updateLevel(level: $level)
}`;

const UPDATE_SETTINGS_MUTATION = gql`
mutation updateSettingsMutation($language: String, $fontSize: Int, $theme: Boolean, $sound: Boolean) {
  updateSettings(language: $language, fontSize: $fontSize, theme: $theme, sound: $sound) {
    language
    theme
    sound
    fontSize
  }
}
`;

const UPDATE_NICKNAME_MUTATION = gql`
mutation updateNicknameMutation($nickname: String) {
  updateNickname(nickname: $nickname)
}`;

const UPDATE_PASSWORD_MUTATION = gql`
mutation UpdatePassword($password: String!, $newPassword: String!) {
  updatePassword(password: $password, newPassword: $newPassword) {
    message
  }
}`;

const DELETE_USER_MUTATION = gql`
mutation DeleteUser($email: String, $password: String) {
  deleteUser(email: $email, password: $password) {
    message
  }
}`;

const CREATE_GAME_MUTATION: DocumentNode = gql`
mutation AddGameDetailsMutation($game: GameInput) {
  addGameDetails(game: $game) {
    message
  }
}
`;

export {
  LOGIN_MUTATION, LOGOUT_MUTATION, SIGNUP_MUTATION, ADD_NEW_SCORE_MUTATION, UPDATE_LEVEL_MUTATION,
  UPDATE_SETTINGS_MUTATION, UPDATE_NICKNAME_MUTATION, CREATE_GAME_MUTATION,
  UPDATE_PASSWORD_MUTATION, DELETE_USER_MUTATION,
};
