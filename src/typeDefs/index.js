const gql = require('graphql-tag');
const { UserTypeDef } = require('../schema/UserSchema');
const { InterestTypeDef } = require('../schema/InterestSchema');
const { MessageTypeDef } = require('../schema/MessageSchema');
const { ConversationTypeDef } = require('../schema/ConversationSchema');

const typeDefs = gql`
  ${UserTypeDef}

  ${InterestTypeDef}

  ${MessageTypeDef}

  ${ConversationTypeDef}

  type Query {
    me: User
    meConnectedUsers: [User]

    user(userId: ID!): User
    communityUsers: [User]

    messages(conversationId: ID, recipients: [ID]): [Message]
    messagesUnreadCount: Int

    conversations: [Conversation]
  }

  type Mutation {
    meUpdate(userInput: ActualUserInput): String
    meAddInterest(name: String): Interest
    meRemoveInterest(id: String): Interest
    meConnectUser(userId: String!): User
    meDisconnectUser(userId: String!): User

    createConversation(input: ConversationCreateInput!): Conversation
    updateConversation(input: ConversationUpdateInput!): Conversation
    markConversationAsRead(id: ID!): Conversation

    createMessage(conversationId: ID, recipients: [ID], text: String!): Message
  }

  input ActualUserInput {
    name: String
  }
`;

module.exports = typeDefs;
