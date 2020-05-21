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
    const me = await this.context.dataSources.userAPI.getMe();

    const withMe = recipients.slice(0, 0).push(me._id);
    const messagesFrom = await Message.find()
      .where('recipients')
      .in(recipients)
      .where('author')
      .equals(me)
      .populate('recipients')
      .populate('author');

    const messagesTo = await Message.find()
      .where('recipients')
      .in(withMe)
      .where('author')
      .in(recipients)
      .populate('recipients')
      .populate('author');

    return messagesFrom.concat(messagesTo);
  }

  async onSendMessage(recipients, text) {
    const author = await this.context.dataSources.userAPI.getMe();
    const message = new Message({ text, recipients, author });

    const savedMessage = await (await message.save())
      .populate('recipients')
      .execPopulate();

    return savedMessage;
  }
}

module.exports = MessageAPI;
