const mongoose = require('mongoose');
const gql = require('graphql-tag');

const Schema = mongoose.Schema;
const MessageSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    text: Schema.Types.String,
    conversation: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    createdAt: Number,
    updatedAt: Number,
  },

  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const MessageTypeDef = gql`
  type Message {
    id: ID
    author: User
    text: String
    conversation: Conversation
    createdAt: String
    updatedAt: String
  }
`;

module.exports = { MessageSchema, MessageTypeDef };
