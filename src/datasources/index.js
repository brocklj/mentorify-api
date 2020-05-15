const UserAPI = require('./UserAPI');
const MessageAPI = require('./MessageAPI');
// TODO: Put all index into loaders
const dataSources = () => ({
  userAPI: new UserAPI(),
  messageAPI: new MessageAPI(),
});

module.exports = { dataSources };
