const userResolver = require('./UserResolver');

const resolvers = {
  Query: {
    ...userResolver.query,
  },
  Mutation: {
    ...userResolver.mutation,
  },
};

module.exports = resolvers;
