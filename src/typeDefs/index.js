const gql = require('graphql-tag');
const { UserTypeDef } = require('../schema/UserSchema');
const { InterestTypeDef } = require('../schema/InterestSchema');
const { MessageTypeDef } = require('../schema/MessageSchema');

const typeDefs = gql`
  ${UserTypeDef}

  ${InterestTypeDef}

  ${MessageTypeDef}

  type Query {
    me: User
    connectedUsers: [User]
    communityUsers: [User]
    getMessagesFrom(recipients: [String]): [Message]
  }

  type Mutation {
    updateActualUser(user: ActualUserInput): String
    toggleUserConnection(userId: String): String
    connectUser(userId: String!): User
    disconnectUser(userId: String!): User

    addInterest(name: String): Interest
    removeInterest(id: String): Interest

    sendMessage(recipients: [String], text: String!): String!
  }

  input ActualUserInput {
    name: String
  }
`;

module.exports = typeDefs;
