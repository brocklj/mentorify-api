const { UserInputError } = require('apollo-server-express');
const { DataSource } = require('apollo-datasource');
const { User, Conversation } = require('../models');

class ConversationAPI extends DataSource {
  constructor() {
    super();
  }
  initialize({ context }) {
    this.context = context;
  }
  async getConversations() {
    const me = await this.context.dataSources.userAPI.getMe();
    const conversations = await Conversation.find({ users: me._id })
      .populate('messages')
      .populate('users');

    return conversations;
  }

  async getOrCreateForRecipients(recipients) {
    console.log(recipients);
    const me = await this.context.dataSources.userAPI.getMe();
    recipients.push(me._id);

    const conversation = await Conversation.findOne({
      users: { $all: recipients, $size: recipients.length },
    });

    if (!conversation) {
      const newConversation = new Conversation({
        name: 'new Conversation',
        users: recipients,
      });
      await newConversation.save();

      return newConversation;
    } else {
      return conversation;
    }
  }
}

module.exports = ConversationAPI;
