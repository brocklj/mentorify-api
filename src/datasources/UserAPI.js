const { DataSource } = require('apollo-datasource');
const { User } = require('../models');

class UserAPI extends DataSource {
  constructor() {
    super();
  }
  initialize({ context }) {
    this.context = context;
  }

  async getMe() {
    const { email } = this.context.user;
    return await User.findOne({ email });
  }

  async find(id = '') {
    if (id) {
    } else {
      const { email } = this.context.user;
      return await User.findOne({ email }).populate('connectedUsers');
    }
  }

  async findCommonInterestUsers() {
    return await User.find();
  }

  async connect(userId) {
    const me = await this.getMe();
    const user = await User.findOne({ _id: userId });
    me.connectedUsers.push(user);

    return await me.save();
  }

  async disconnect(userId) {
    const me = await this.getMe();
    me.connectedUsers.splice(me.connectedUsers.indexOf(userId), 1);

    return await me.save();
  }
}

module.exports = UserAPI;
