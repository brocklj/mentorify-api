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
      .populate({
        path: 'users',
        match: { _id: { $ne: me._id } },
      });

    return conversations;
  }

  async getOrCreateConversation({ conversationId, recipients }) {
    const me = await this.context.dataSources.userAPI.getMe();

    let conversation;

    if (recipients) {
      recipients.push(me._id);
      conversation = await Conversation.findOne({
        users: { $all: recipients, $size: recipients.length },
      });
    }

    if (conversationId) {
      conversation = await Conversation.findOne({
        _id: conversationId,
      });
    }

    if (!conversation) {
      const newConversation = new Conversation({
        name: 'new Conversation',
        users: recipients,
      });
      await newConversation.save();

      return newConversation;
    }
    return conversation;
  }
}

module.exports = ConversationAPI;
