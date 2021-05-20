const typeDefs = () => {
  return `
    type Message {
        id: ID!
        user: String!
        content: String!
    }

    type Query {
        messages: [Message!]
    }

    type Mutation {
        postMessage(user: String!, content: String!): Message!
    }

    type Subscription {
        messages: [Message!]
    }
 `;
};

module.exports = typeDefs;
