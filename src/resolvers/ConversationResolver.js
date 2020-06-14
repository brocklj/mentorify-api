const ConversationResolver = {
  query: {
    conversations: (_, __, { dataSources }) =>
      dataSources.conversationAPI.getConversations(),
  },
  mutation: {
    createConversation: (_, __, { dataSources }) =>
      dataSources.conversationAPI.createConversation(),
    updateConversation: (_, { input }, { dataSources }) =>
      dataSources.conversationAPI.updateConversation(input),
    markConversationAsRead: (_, { id }, { dataSources }) =>
      dataSources.conversationAPI.markAsRead(id),
  },
};

module.exports = ConversationResolver;
