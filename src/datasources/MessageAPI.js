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

    const withMe = recipients.concat([me._id]);

    const messagesFrom = await Message.find({
      $or: [
        { recipients: { $in: recipients }, author: me },
        { author: { $in: recipients }, recipients: { $in: withMe } },
      ],
    })
      .populate('author')
      .populate('recipients');

    console.log(messagesFrom);

    return messagesFrom;
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
