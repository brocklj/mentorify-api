const { UserInputError } = require('apollo-server-express');
const { DataSource } = require('apollo-datasource');
const { Message, Conversation } = require('../models');

class MessageAPI extends DataSource {
  constructor() {
    super();
  }
  initialize({ context }) {
    this.context = context;
  }
  // Get messages from the recipients including current users' messages
  async getMessages(conversationId, recipients) {
    const conversation = await this.context.dataSources.conversationAPI.getOrCreateConversation(
      {
        conversationId,
        recipients,
      }
    );

    const messagesFrom = await Message.find()
      .where('conversation')
      .equals(conversation)
      .populate('author')
      .populate('conversation')
      .sort({ createdAt: 'desc' })
      .limit(10);

    return messagesFrom.reverse();
  }

  async getUreadCount() {
    const me = await this.context.dataSources.userAPI.getMe();
    const conversations = await this.context.dataSources.conversationAPI.getConversations();
    const count = conversations.reduce((acc, c) => {
      if (!c.readByIds.find((id) => id == me._id)) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    return count;
  }

  async createMessage(conversationId, recipients, text) {
    const author = await this.context.dataSources.userAPI.getMe();
    const conversation = await this.context.dataSources.conversationAPI.getOrCreateConversation(
      {
        conversationId,
        recipients,
      }
    );
    const message = new Message({ text, author });
    message.conversation = conversation;

    conversation.messages.push(message);
    conversation.readByIds = [author.id];

    await conversation.save();

    const savedMessage = await (await message.save())
      .populate('recipients')
      .execPopulate();

    return savedMessage;
  }
}

module.exports = MessageAPI;
