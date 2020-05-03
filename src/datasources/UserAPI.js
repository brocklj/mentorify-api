const { UserInputError } = require('apollo-server-express');
const { DataSource } = require('apollo-datasource');
const { User, Interest } = require('../models');

class UserAPI extends DataSource {
  constructor() {
    super();
  }
  initialize({ context }) {
    this.context = context;
  }

  async getMe() {
    const { email } = this.context.user;
    return await User.findOne({ email }).populate('interests');
  }

  async find({ id, email } = {}) {
    if (id) {
      return await User.findOne({ _id: id });
    } else {
      return await this.getMe();
    }
  }

  async findConnectedUsers() {
    const { email } = this.context.user;
    const me = await User.findOne({ email }).populate('connectedUsers');
    return me.connectedUsers;
  }

  async findCommonInterestUsers() {
    return await User.find().populate('interests');
  }

  async connect(userId) {
    const me = await this.getMe();
    if (me.connectedUsers.includes(userId)) {
      throw new UserInputError('Connection already exists');
    }

    const user = await User.findOne({ _id: userId });
    me.connectedUsers.push(user);
    await me.save();
    return user;
  }

  async disconnect(userId) {
    const me = await this.getMe();
    if (!me.connectedUsers.includes(userId)) {
      throw new UserInputError('Connection not exists');
    }
    const user = await this.find({ id: userId });

    me.connectedUsers.splice(me.connectedUsers.indexOf(userId), 1);
    await me.save();

    return user;
  }

  async addInterest(name) {
    const me = await this.find();
    const interest = await Interest.findOne({ name });
    if (interest) {
      me.interests.push(interest);
      await me.save();
      return interest;
    } else {
      const newInterest = await Interest.create({ name });
      me.interests.push(newInterest);
      await me.save();
      return newInterest;
    }
  }

  async removeInterest(interestId) {
    const me = await this.getMe();
    const interest = await Interest.findOne({ _id: interestId });
    if (!interest) {
      throw new UserInputError('Interest does not exist.');
    }
    me.interests = me.interests.filter(
      (interest) => interest._id != interestId
    );

    await me.save();

    return interest;
  }
}

module.exports = UserAPI;
