const MessageResolver = {
  query: {
    getConversations: (_, __, { dataSources }) =>
      dataSources.conversationAPI.getConversations(),
    getMessages: (_, { conversationId, recipients }, { dataSources }) =>
      dataSources.messageAPI.getMessages(conversationId, recipients),
  },
  mutation: {
    sendMessage: (_, { conversationId, recipients, text }, { dataSources }) =>
      dataSources.messageAPI.sendMessage(conversationId, recipients, text),
  },
};

module.exports = MessageResolver;
