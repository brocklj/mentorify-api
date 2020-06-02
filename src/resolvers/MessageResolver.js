const MessageResolver = {
  query: {
    getConversations: (_, __, { dataSources }) =>
      dataSources.conversationAPI.getConversations(),
    getMessagesFrom: (_, { recipients }, { dataSources }) =>
      dataSources.messageAPI.getMessagesFrom(recipients),
  },
  mutation: {
    sendMessage: (_, { recipients, text }, { dataSources }) =>
      dataSources.messageAPI.sendMessage(recipients, text),
  },
};

module.exports = MessageResolver;
