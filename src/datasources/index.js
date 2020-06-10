const UserAPI = require('./UserAPI');
const MessageAPI = require('./MessageAPI');
const ConversationAPI = require('./ConversationAPI');
// TODO: Put all index into loaders
const dataSources = () => ({
  userAPI: new UserAPI(),
  messageAPI: new MessageAPI(),
  conversationAPI: new ConversationAPI(),
});

module.exports = { dataSources };
