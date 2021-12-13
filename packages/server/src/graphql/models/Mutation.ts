export const Mutation = `
  type Mutation {
    signup(email: String, password: String, nickname: String): AuthPayload!
    login(email: String, password: String): AuthPayload!
    logout: Void
    deleteUser(email: String, password: String): Message!
  }
`;
