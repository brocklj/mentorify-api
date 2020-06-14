const userResolver = require('./UserResolver');
const messageResoler = require('./MessageResolver');
const conversationResolver = require('./ConversationResolver');

const resolvers = {
  Query: {
    ...userResolver.query,
    ...conversationResolver.query,
    ...messageResoler.query,
  },
  Mutation: {
    ...userResolver.mutation,
    ...conversationResolver.mutation,
    ...messageResoler.mutation,
  },
};

module.exports = resolvers;
