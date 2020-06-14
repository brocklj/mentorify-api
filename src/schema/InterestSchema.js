const mongoose = require('mongoose');
const gql = require('graphql-tag');

const Schema = mongoose.Schema;
const InterestSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      index: { unique: true },
      unique: true,
      lowercase: true,
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const InterestTypeDef = gql`
  type Interest {
    id: ID
    name: String
    createdAt: String
    updatedAt: String
  }
`;

module.exports = { InterestSchema, InterestTypeDef };
