export const Query = `
  type Query {
    generateWordSet(language: String): [String]!
    self: User!
  }
`;
