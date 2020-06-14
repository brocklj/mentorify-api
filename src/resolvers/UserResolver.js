const UserResolver = {
  query: {
    me: (_, __, { dataSources }) => dataSources.userAPI.find(),
    meConnectedUsers: (_, __, { dataSources }) =>
      dataSources.userAPI.findConnectedUsers(),
    communityUsers: (_, __, { dataSources }) =>
      dataSources.userAPI.findCommonInterestUsers(),
    user: (_, { userId }, { dataSources, ...rest }) => {
      return dataSources.userAPI.find({ id: userId });
    },
  },
  mutation: {
    meUpdate: () => {},
    meConnectUser: (_, { userId }, { dataSources }) =>
      dataSources.userAPI.connect(userId),
    meDisconnectUser: (_, { userId }, { dataSources }) =>
      dataSources.userAPI.disconnect(userId),
    meAddInterest: (_, { name }, { dataSources }) =>
      dataSources.userAPI.addInterest(name),
    meRemoveInterest: (_, { id }, { dataSources }) =>
      dataSources.userAPI.removeInterest(id),
  },
};

module.exports = UserResolver;
