const gql = require('graphql-tag');
const { UserTypeDef } = require('../schema/UserSchema');

const typeDefs = gql`
  ${UserTypeDef}

  type Query {
    me: User
  }

  type Mutation {
    updateActualUser(user: ActualUserInput): String
  }

  input ActualUserInput {
    name: String
  }
`;

module.exports = typeDefs;
