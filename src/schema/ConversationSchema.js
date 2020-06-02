const mongoose = require('mongoose');
const gql = require('graphql-tag');

const Schema = mongoose.Schema;
const ConversationSchema = new Schema(
  {
    name: {
      type: String,
    },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    readByUserIds: [{ type: Schema.Types.String }],
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const ConversationTypeDef = gql`
  type Conversation {
    id: ID
    name: String
    messages: [Message]
    users: [User]
    readByIds: [String]
    createdAt: String
    updatedAt: String
  }
`;

module.exports = { ConversationSchema, ConversationTypeDef };
