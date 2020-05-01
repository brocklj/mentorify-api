const UserResolver = {
  query: {
    me: (_, __, { dataSources }) => dataSources.userAPI.find(_, __),
    communityUsers: (_, __, { dataSources }) =>
      dataSources.userAPI.findCommonInterestUsers(),
  },
  mutation: {
    connectUser: (_, { userId }, { dataSources }) =>
      dataSources.userAPI.connect(userId),
    disconnectUser: (_, { userId }, { dataSources }) =>
      dataSources.userAPI.disconnect(userId),
  },
};

module.exports = UserResolver;
