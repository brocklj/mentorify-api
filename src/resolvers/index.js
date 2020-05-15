const userResolver = require('./UserResolver');
const messageResoler = require('./MessageResolver');

const resolvers = {
  Query: {
    ...userResolver.query,
    ...messageResoler.query,
  },
  Mutation: {
    ...userResolver.mutation,
    ...messageResoler.mutation,
  },
};

module.exports = resolvers;
