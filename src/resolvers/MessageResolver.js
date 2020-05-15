const MessageResolver = {
  query: {
    getMessagesFrom: (_, { recipients }, { dataSources }) =>
      dataSources.messageAPI.getMessagesFrom(recipients),
  },
  mutation: { sendMessage: (_, __, { recipients, text }) => {} },
};
