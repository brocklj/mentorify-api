const mongoose = require('mongoose');
const gql = require('graphql-tag');

const Schema = mongoose.Schema;
// Mongoose Schema Definition
const UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true, unique: true, required: true },
  hash: String,
  isVerified: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: { type: Date, default: Date.now() },
});

// GraphQL Type definition
const UserTypeDef = gql`
  type User {
    name: String
    email: String
    isVerified: Boolean
  }
`;

module.exports = { UserSchema, UserTypeDef };
