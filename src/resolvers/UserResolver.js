const UserResolver = {
  query: {
    me: (_, __, { dataSources }) => dataSources.userAPI.find(),
    communityUsers: (_, __, { dataSources }) =>
      dataSources.userAPI.findCommonInterestUsers(),
    connectedUsers: (_, __, { dataSources }) =>
      dataSources.userAPI.findConnectedUsers(),
  },
  mutation: {
    connectUser: (_, { userId }, { dataSources }) =>
      dataSources.userAPI.connect(userId),
    disconnectUser: (_, { userId }, { dataSources }) =>
      dataSources.userAPI.disconnect(userId),
    addInterest: (_, { name }, { dataSources }) =>
      dataSources.userAPI.addInterest(name),
    removeInterest: (_, { id }, { dataSources }) =>
      dataSources.userAPI.removeInterest(id),
  },
};

module.exports = UserResolver;
