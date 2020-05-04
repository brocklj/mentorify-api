const mongoose = require('mongoose');
const gql = require('graphql-tag');

const Schema = mongoose.Schema;
// Mongoose Schema Definition
const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, lowercase: true, unique: true, required: true },
    hash: String,
    isVerified: { type: Boolean, default: false },
    createdAt: Number,
    updatedAt: Number,
    connectedUsers: [{ type: Schema.ObjectId, ref: 'User' }],
    interests: [{ type: Schema.Types.ObjectId, ref: 'Interest', unique: true }],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

// GraphQL Type definition
const UserTypeDef = gql`
  type User {
    id: String
    name: String
    email: String
    connectedUsers: [User]
    interests: [Interest]
    isVerified: Boolean
    createdAt: String
    updatedAt: String
  }
`;

module.exports = { UserSchema, UserTypeDef };
