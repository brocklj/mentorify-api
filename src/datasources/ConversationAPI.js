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

  async createConversation(input) {
    const me = await this.context.dataSources.userAPI.getMe();
    input.users.push(me._id);
    if (!input.name) {
      input.name = `Group created by ${me.name}`;
    }

    let conversation;

    if (input.users.length > 2) {
      conversation = new Conversation(input);
    } else {
      conversation = await this.getOrCreateConversation({
        recipients: input.users,
      });
    }

    conversation.readByIds.push(me._id);
    await conversation.save();

    return conversation;
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

  async updateConversation(input) {
    const conversation = await Conversation.findOne({ _id: input.id });
    conversation.readByIds = input.readByIds;

    return conversation;
  }

  async markAsRead(id) {
    const me = await this.context.dataSources.userAPI.getMe();
    const conversation = await Conversation.findOne({ _id: id });
    if (!conversation.readByIds.includes(me._id)) {
      conversation.readByIds.push(me._id);
      await conversation.save();
    }

    return conversation;
  }
}

module.exports = ConversationAPI;
