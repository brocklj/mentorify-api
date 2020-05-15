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
  async getMessagesFrom(recipients) {}
}

module.exports = MessageAPI;
