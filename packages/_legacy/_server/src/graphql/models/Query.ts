export const Query = `
  type Query {
    generateWordSet(language: String): [String]!
    self: User!
    findScores: [Score]!
    findOneSet(letter: String): [String]!
    findGameData: GroupedGameData!
    fetchUserGamingDetails(userId: String): UserGameDetails!
  }
`;
