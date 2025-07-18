/**
 * AuthPayload type definition
 * This is the type of the data returned when a user signs up
 */
export const AuthPayload = `
 type AuthPayload {
   user: User!
 }
 `;

/**
 * User type definition
 */
export const User = `
 type User {
   id: ID!
   nickname: String
   email: String
   password: String
   is_active: Boolean
   scores: [Score]
   didacticiel_level: Int
   settings: Settings
 }`;

/**
 * Message type definition
 */
export const Message = `
 type Message {
   message: String!
 }
 `;

/**
* Void scalar definition
*/
export const Void = `
scalar Void
`;

/**
 * Date scalar definition
 */
export const Date = `
scalar Date
`;

export const Types: string[] = [User, AuthPayload, Message, Void, Date];
