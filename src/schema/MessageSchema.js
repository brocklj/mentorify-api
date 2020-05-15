const mongoose = require('mongoose');
const gql = require('graphql-tag');

const Schema = mongoose.Schema;
const MessageSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: 'User' },
    recipients: [{ type: Schema.ObjectId, ref: 'User' }],
    text: String,
    createdAt: Number,
    updatedAt: Number,
  },

  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const MessageTypeDef = gql`
  type Message {
    id: String
    author: User
    recipients: [User]
    text: String
    createdAt: String
    updatedAt: String
  }
`;

module.exports = { MessageSchema, MessageTypeDef };
