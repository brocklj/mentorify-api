const { UserInputError } = require('apollo-server-express');
const { DataSource } = require('apollo-datasource');
const { Message } = require('../models');

class MessageAPI extends DataSource {
  constructor() {
    super();
  }
  initialize({ context }) {
    this.context = context;
  }
  // Get messages from the recipients including current users' messages
  async getMessagesFrom(recipients) {
    const conversation = await this.context.dataSources.conversationAPI.getOrCreateForRecipients(
      recipients
    );

    const messagesFrom = await Message.find()
      .where('conversation')
      .equals(conversation)
      .populate('author')
      .sort({ createdAt: 'desc' })
      .limit(10);

    return messagesFrom.reverse();
  }

  async sendMessage(recipients, text) {
    const author = await this.context.dataSources.userAPI.getMe();
    const conversation = await this.context.dataSources.conversationAPI.getOrCreateForRecipients(
      recipients
    );
    const message = new Message({ text, author });
    message.conversation = conversation;

    conversation.messages.push(message);

    await conversation.save();

    const savedMessage = await (await message.save())
      .populate('recipients')
      .execPopulate();

    return savedMessage;
  }
}

module.exports = MessageAPI;
