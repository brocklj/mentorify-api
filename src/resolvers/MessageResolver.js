const MessageResolver = {
  query: {
    getMessagesFrom: (_, { recipients }, { dataSources }) =>
      dataSources.messageAPI.getMessagesFrom(recipients),
  },
  mutation: {
    sendMessage: (_, { recipients, text }, { dataSources }) =>
      dataSources.messageAPI.onSendMessage(recipients, text),
  },
};

module.exports = MessageResolver;
