const UserResolver = {
  query: { me: (_, __, { dataSources }) => dataSources.userAPI.find() },
  mutation: {},
};

module.exports = UserResolver;
