export const Query = `
  type Query {
    hello: Message
    generateWordSet(language: String): [String]!
  }
`;
