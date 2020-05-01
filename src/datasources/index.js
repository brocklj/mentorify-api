const UserAPI = require('./UserAPI');
// TODO: Put all index into loaders
const dataSources = () => ({
  userAPI: new UserAPI(),
});

module.exports = { dataSources };
