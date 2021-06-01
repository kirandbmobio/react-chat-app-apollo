const typeDefs = () => {
  return `
    type Message {
        id: ID!
        content: String!
        from: String!
        to: String!
        createdAt: String
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        token: String
        latestMessage: Message
        createdAt: String!
    }

    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    type Query {
        messages: [Message!]
        getUsers: [User!]
        login(email: String!, password: String!): User
        getMessages(from:String!): [Message]!
    }

    type Mutation {
        postMessage(to:String!, content: String!): Message!
        register(userInput: UserInput!): User!
    }

    type Subscription {
        messages: [Message!]
    }
 `;
};

module.exports = typeDefs;
