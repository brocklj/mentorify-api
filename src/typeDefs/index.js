const gql = require('graphql-tag');
const { UserTypeDef } = require('../schema/UserSchema');

const typeDefs = gql`
  ${UserTypeDef}

  type Query {
    me: User
    communityUsers: [User]
  }

  type Mutation {
    updateActualUser(user: ActualUserInput): String
    toggleUserConnection(userId: String): String
    connectUser(userId: String!): User
    disconnectUser(userId: String!): User
  }

  input ActualUserInput {
    name: String
  }
`;

module.exports = typeDefs;
