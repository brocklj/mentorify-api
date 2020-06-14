const MessageResolver = {
  query: {
    messages: (_, { conversationId, recipients }, { dataSources }) =>
      dataSources.messageAPI.getMessages(conversationId, recipients),

    messagesUnreadCount: (_, __, { dataSources }) =>
      dataSources.messageAPI.getUreadCount(),
  },
  mutation: {
    createMessage: (_, { conversationId, recipients, text }, { dataSources }) =>
      dataSources.messageAPI.createMessage(conversationId, recipients, text),
  },
};

module.exports = MessageResolver;
