const gql = require('graphql-tag');
const { UserTypeDef } = require('../schema/UserSchema');
const { InterestTypeDef } = require('../schema/InterestSchema');

const typeDefs = gql`
  ${UserTypeDef}

  ${InterestTypeDef}

  type Query {
    me: User
    connectedUsers: [User]
    communityUsers: [User]
  }

  type Mutation {
    updateActualUser(user: ActualUserInput): String
    toggleUserConnection(userId: String): String
    connectUser(userId: String!): User
    disconnectUser(userId: String!): User

    addInterest(name: String): Interest
    removeInterest(id: String): Interest
  }

  input ActualUserInput {
    name: String
  }
`;

module.exports = typeDefs;
