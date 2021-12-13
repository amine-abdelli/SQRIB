export const Mutation = `
  type Mutation {
    signup(email: String, password: String, nickname: String): AuthPayload!
    login(email: String, password: String): AuthPayload!
    logout: Void
    deleteUser(email: String, password: String): Message!
    addScoring(timing: String, mpm: Int, wrong_words: Int, correct_letters: Int, total_letters: Int, wrong_letters: Int, precision: Float, points: Int, game_mode: String): Score!
  }
`;
