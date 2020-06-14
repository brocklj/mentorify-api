const ConversationResolver = {
  query: {
    conversations: (_, __, { dataSources }) =>
      dataSources.conversationAPI.getConversations(),
  },
  mutation: {
    createConversation: (_, { input }, { dataSources }) =>
      dataSources.conversationAPI.createConversation(input),
    updateConversation: (_, { input }, { dataSources }) =>
      dataSources.conversationAPI.updateConversation(input),
    markConversationAsRead: (_, { id }, { dataSources }) =>
      dataSources.conversationAPI.markAsRead(id),
  },
};

module.exports = ConversationResolver;
