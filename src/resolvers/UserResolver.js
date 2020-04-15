const UserResolver = {
  query: {
    me: (_, __, { dataSources }) => dataSources.userAPI.find(),
    communityUsers: (_, __, { dataSources }) =>
      dataSources.userAPI.findCommonInterestUsers(),
  },
  mutation: {},
};

module.exports = UserResolver;
