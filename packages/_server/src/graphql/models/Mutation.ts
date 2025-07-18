export const Mutation = `
  type Mutation {
    signup(email: String, password: String, nickname: String): AuthPayload!
    login(email: String, password: String): AuthPayload!
    logout: Void
    deleteUser(email: String, password: String): Message!
    addScoring(mpm: Int, wrong_words: Int, correct_letters: Int, total_letters: Int, wrong_letters: Int, precision: Float, points: Int, type: String, userId: String, gameId: String, username: String, language: String, timer: Int): Score!
    createAllSets: Message!
    updateLevel(level: Int): Int!
    updateSettings(language: String, font_size: Int, theme: Boolean, sound: Boolean): Settings!
    updateNickname(nickname: String): String
    updatePassword(password: String!, newPassword: String!): Message!
    addGameDetails(game: GameInput): Message!
  }
`;
